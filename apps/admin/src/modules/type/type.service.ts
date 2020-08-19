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
  // 检查当前分类是否存在
  async inspectTypeById(_id) {
    return await this.TypeModel.findById(_id);
  }
  // 传入数组，检查每个 id 是否有都存在
  async inspectGroupById(_idArr: string[]) {
    const resNum = await this.GroupModel.find({
      _id: { $in: _idArr },
    })
      .count()
      .exec();
    // 查找到的数量和传进来的数量进行对比
    if (_idArr.length === resNum) {
      return true;
    } else {
      return false;
    }
  }
  async inspectTypeByName(name: string) {
    return await this.TypeModel.findOne({ type_name: name });
  }

  // 检查当前分类是否有子分类
  async inspectChildren(_id) {
    return await this.TypeModel.findOne({
      type_pid: _id,
    });
  }
  // 传入多个id 检查每个id 是否有子分类
  async inspectsChildren(_idArr: string[]) {
    return await this.TypeModel.findOne({
      type_pid: { $in: _idArr },
    });
  }
}
