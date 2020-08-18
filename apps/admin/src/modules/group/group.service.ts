import { Injectable } from '@nestjs/common';
import { Group, Type, Video, User, Article, Topic } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(Type.name) private readonly typeModel: Model<Type>,
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
    @InjectModel(Topic.name) private readonly topicModel: Model<Topic>,
  ) {}
  async inspect(group_id) {
    const rule = { group_id };
    if (!!(await this.typeModel.findOne(rule))) {
      return Promise.resolve('分类');
    }
    if (!!(await this.videoModel.findOne(rule))) {
      return Promise.resolve('视频');
    }
    if (!!(await this.userModel.findOne(rule))) {
      return Promise.resolve('用户');
    }
    if (!!(await this.articleModel.findOne(rule))) {
      return Promise.resolve('文章');
    }
    if (!!(await this.topicModel.findOne(rule))) {
      return Promise.resolve('专辑');
    }
    return Promise.resolve(true);
  }
}
