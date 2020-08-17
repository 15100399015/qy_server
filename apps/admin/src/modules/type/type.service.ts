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
  async inspectChildren(_id) {
    let num = await this.TypeModel.findOne({
      type_pid: _id,
    }).count();
    return num > 0;
  }
}
