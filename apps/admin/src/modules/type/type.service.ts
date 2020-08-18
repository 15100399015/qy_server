import { Injectable } from '@nestjs/common';
import { Type, Group } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel(Type.name) private readonly TypeModel: Model<Type>,
    @InjectModel(Group.name) private readonly GroupModel: Model<Type>,
  ) {}
  //   检查当前分类是否有子分类
  async inspectType(_id) {
    const number = await this.TypeModel.findById(_id).count().exec();
    return number > 0;
  }
  //   检查当前分类是否有子分类
  async inspectChildren(_id) {
    const number = await this.TypeModel.findOne({
      type_pid: _id,
    })
      .count()
      .exec();
    return number > 0;
  }
  // 检查多个id
  async inspectChildrens(_idArr) {
    const number = await this.TypeModel.find({
      type_pid: { $in: _idArr },
    })
      .count()
      .exec();
    return number > 0;
  }
  // 验证当前分类是否存在
  async verifyTypeExist(_id) {
    return this.TypeModel.findById(_id).count().exec();
  }
  // 验证分组是否存在
  async verifyGroupExist(_id) {
    return this.GroupModel.findById(_id).count().exec();
  }
}
