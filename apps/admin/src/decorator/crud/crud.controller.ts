import { Model } from 'mongoose';
import {
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { CrudQuery, ICrudQuery } from './crud-query.decorator';
import { get } from 'lodash';
import { CrudOptionsWithModel } from './crud.interface';
import { DiyHttpException } from './util';

export class CrudPlaceholderDto {}
// controller
export class CrudController {
  constructor(
    public model: Model<{} | any>,
    public crudOptions?: CrudOptionsWithModel,
  ) {}
  // 获取总数
  @Get('count')
  count(): Promise<number> {
    return this.model.countDocuments().exec();
  }
  // 按条件查找
  @Get('find')
  find(@CrudQuery('query') query: ICrudQuery = {}) {
    let {
      where = {},
      limit = 10,
      page = 1,
      populate = undefined,
      sort = undefined,
      select = undefined,
    } = query;
    let skip = (page - 1) * limit;
    const find = async () => {
      const data = await this.model
        .find()
        // 规则
        .where(where)
        // 筛选字段
        .select(select)
        // 跳过
        .skip(skip)
        // 当前数据
        .limit(limit)
        // 排序方式
        .sort(sort)
        // 填充
        .populate(populate);
      const total = await this.model.countDocuments(where);
      return {
        total: total,
        data: data,
        lastPage: Math.ceil(total / limit),
        currentPage: page,
        limit: data.length,
      };
    };
    return find();
  }
  // 单个查找
  @Get('findOne')
  async findOne(@CrudQuery('query') query: any) {
    const { where = {}, select = undefined } = query;
    return this.model.findOne(where).select(select).exec();
  }
  // 查找所有
  @Get('findAll')
  async findAll(@CrudQuery('query') query) {
    const { where = {}, select = undefined } = query;
    return this.model.find().where(where).select(select).exec();
  }
  // 创建数据
  @Post('create')
  async create(@Body() body: CrudPlaceholderDto) {
    const transform = get(this.crudOptions, 'routes.create.transform');
    if (transform) {
      body = transform(body);
    }
    return this.model.create(body).catch((err) => {
      throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
    });
  }
  // 插入多个
  @Post('insertMany')
  async insertMany(@Body() body: CrudPlaceholderDto) {
    return this.model
      .insertMany(body, {
        ordered: false,
        rawResult: false,
      })
      .catch((err) => {
        throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
      });
  }
  // 根据id更新一条数据
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: CrudPlaceholderDto) {
    const transform = get(this.crudOptions, 'routes.update.transform');
    if (transform) {
      body = transform(body);
    }
    return this.model
      .findByIdAndUpdate(id, body, {
        new: true,
        upsert: false,
        runValidators: true,
        context: 'query',
      })
      .catch((err) => {
        throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
      });
  }
  // 更新多个
  @Put('updateMany')
  updateMany(
    @Body('conditions') conditions: any,
    @Body('doc') doc: CrudPlaceholderDto,
  ) {
    return this.model.updateMany(conditions, doc).catch((err) => {
      throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
    });
  }
  // 根据id删除一条数据
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.model.findByIdAndRemove(id).catch((err) => {
      throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
    });
  }
  // 删除多个
  @Delete('deleteMany')
  deleteMany(@Body('conditions') conditions: CrudPlaceholderDto) {
    return this.model.deleteMany(conditions).exec();
  }
}
