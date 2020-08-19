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
    if (await this.typeModel.findOne(rule)) return '分类';
    if (await this.videoModel.findOne(rule)) return '视频';
    if (await this.userModel.findOne(rule)) return '用户';
    if (await this.articleModel.findOne(rule)) return '文章';
    if (await this.topicModel.findOne(rule)) return '专辑';
    return true;
  }
}
