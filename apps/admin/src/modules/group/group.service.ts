import { Injectable } from '@nestjs/common';
import { Group, Type, Video, User, Article, Topic } from '@libs/db/schemas';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
@Injectable()
export class GroupService {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  async inspect(group_id: string) {
    const rule = { group_id };
    if (await this.connection.models[Type.name].findOne(rule)) return '分类';
    if (await this.connection.models[Video.name].findOne(rule)) return '视频';
    if (await this.connection.models[User.name].findOne(rule)) return '用户';
    if (await this.connection.models[Article.name].findOne(rule)) return '文章';
    if (await this.connection.models[Topic.name].findOne(rule)) return '专辑';
    return true;
  }
}
