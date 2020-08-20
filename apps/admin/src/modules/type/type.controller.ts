import {
  Controller,
  Post,
  Delete,
  Put,
  Param,
  ForbiddenException,
  Body,
  Get,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Type, Group } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles } from '@admin/decorator/roles.decorator';
import { TypeService } from './type.service';
import { VerificationService } from '@admin/service/verification.service';

@ApiTags('分类')
@Controller('type')
export class TypeController {
  constructor(
    private readonly typeService: TypeService,
    private readonly verificationService: VerificationService,
    @InjectModel(Type.name) private readonly model: Model<Type>,
  ) {}
  @Roles('admin')
  @Get('findType1/:mid')
  async findType1(@Param('mid') mid: number) {
    return this.model
      .find({
        type_pid: '',
        type_mid: mid,
      })
      .exec();
  }
  // 无条件获取所有信息
  @Roles('admin')
  @Get('findAll')
  async finAll() {
    // 填充用户权限组信息
    return this.model
      .find({
        type_pid: '',
      })
      .populate(
        'group_ids',
        {
          group_name: true,
          group_color: true,
        },
        Group.name,
      )
      .populate('children')
      .exec();
  }
  // 根据id获取单个文档
  @Roles('admin')
  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    return this.model.findById(id).exec();
  }
  // 创建一条信息
  @Roles('admin')
  @Post('create')
  async create(@Body() doc: Type) {
    const { group_ids, type_pid, type_name } = doc;
    if (type_name === '' || type_name === undefined) {
      throw new BadRequestException('分类名必须');
    }
    if (
      await this.verificationService.testOneExist(
        Type.name,
        'type_name',
        type_name,
      )
    ) {
      throw new ForbiddenException('分类名称重复');
    }
    if (type_pid !== undefined && type_pid !== '') {
      if (
        !(await this.verificationService.testOneExist(
          Type.name,
          '_id',
          type_pid,
        ))
      ) {
        throw new ForbiddenException('顶级分类不存在');
      }
    }
    if (group_ids !== undefined && group_ids.length !== 0) {
      if (
        !(await this.verificationService.testAllExist(
          Group.name,
          '_id',
          group_ids,
        ))
      ) {
        throw new ForbiddenException('某些权限组不存在');
      }
    }
    return this.model.create(doc).catch(() => {
      throw new InternalServerErrorException('服务器内部错误');
    });
  }
  @Roles('admin')
  @Put('update/:id')
  async update(@Body() doc: Type, @Param('id') id: string) {
    const { group_ids, type_pid, type_name } = doc;
    const findNameRes = await this.verificationService.testOneExist(
      Type.name,
      'type_name',
      type_name,
    );
    const findPIdRes = await this.verificationService.testOneExist(
      Type.name,
      '_id',
      type_pid,
    );
    const findIdRes = await this.verificationService.testOneExist(
      Type.name,
      '_id',
      id,
    );
    const findGroupRes = await this.verificationService.testAllExist(
      Group.name,
      '_id',
      group_ids,
    );
    // 检查分类名是否存在
    if (type_name === undefined && type_name === '') {
      throw new BadRequestException('分类名必须');
    }
    // 检查是否需要更新
    if (Object.keys(doc).every((item) => doc[item] === findNameRes[item])) {
      throw new ForbiddenException('无需更新');
    }
    // 检查分类名是否重复
    if (findNameRes && String(id) !== String(findNameRes._id)) {
      throw new ForbiddenException('分类名重复');
    }
    // 父分类是否存在
    if (!findPIdRes) {
      throw new ForbiddenException('顶级分类不存在');
    }
    // 检查父分类是否是二级分类
    if (findPIdRes.type_pid !== '') {
      throw new ForbiddenException('不能选择子分类作为顶级分类');
    }
    // 检查权限组是否全部存在
    if (group_ids.length !== 0 && findGroupRes) {
      throw new ForbiddenException('某些权限组不存在');
    }
    // 是否把自己当作自己的父分类
    if (String(type_pid) === String(findIdRes._id)) {
      throw new ForbiddenException('父分类不能选择自己');
    }
    return this.model
      .findByIdAndUpdate(id, doc)
      .exec()
      .catch(() => {
        throw new InternalServerErrorException('服务器内部错误');
      });
  }
  // 更新状态
  @Roles('admin')
  @Put('changStatus/:id')
  async changStatus(@Param('id') id: string, @Body() body) {
    const findIdRes = await this.verificationService.testOneExist(
      Type.name,
      '_id',
      id,
    );
    // 如果不存在
    if (!findIdRes) {
      throw new ForbiddenException('分类不存在');
    }
    return this.model
      .findByIdAndUpdate(id, {
        type_status: body.status,
      })
      .catch(() => {
        throw new InternalServerErrorException('服务器内部错误');
      });
  }
  // 删除
  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    if (
      await this.verificationService.testOneExist(Type.name, 'type_pid', id)
    ) {
      throw new ForbiddenException('请先清理子分类');
    }
    return this.model
      .findByIdAndDelete(id)
      .exec()
      .catch(() => {
        throw new InternalServerErrorException('服务器内部错误');
      });
  }
  // 删除多个
  @Roles('admin')
  @Delete('deleteMany')
  async deleteMany(@Body() _idArr: string[]) {
    if (
      await this.verificationService.testInOneExists(
        Type.name,
        'type_pid',
        _idArr,
      )
    ) {
      throw new ForbiddenException('请先清理子分类');
    }
    return this.model
      .deleteMany({
        _id: { $in: _idArr },
      })
      .exec();
  }
}
