import { MongooseModule } from '@nestjs/mongoose';

import { Video, VideoSchema } from '../../schemas/video.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { Type, TypeSchema } from '../../schemas/type.schema';
import { Topic, TopicSchema } from '../../schemas/topic.schema';
import { Gbook, GbookSchema } from '../../schemas/gbook.schema';
import { Article, ArticleSchema } from '../../schemas/article.schema';
import { Admin, AdminSchema } from '../../schemas/admin.schema';
import { Actor, ActorSchema } from '../../schemas/actor.schema';
import { Group, GroupSchema } from '../../schemas/group.schema';
import { Comment, CommentSchema } from '../../schemas/comment.schema';
import { Uact, UactSchema } from '../../schemas/uact.schema';
import { Plog, PlogSchema } from '../../schemas/plog.schema';
import { Recharge, RechargeSchema } from '../../schemas/recharge.schema';
import { Distribute, DistributeSchema } from '../../schemas/distribute.schema';
import { Mag, MagSchema } from '../../schemas/msg.schema';

export const RootModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema, collection: 'qy_user' },
  { name: Video.name, schema: VideoSchema, collection: 'qy_video' },
  { name: Article.name, schema: ArticleSchema, collection: 'qy_article' },
  { name: Gbook.name, schema: GbookSchema, collection: 'qy_gbook' },
  { name: Admin.name, schema: AdminSchema, collection: 'qy_admin' },
  { name: Topic.name, schema: TopicSchema, collection: 'qy_topic' },
  { name: Type.name, schema: TypeSchema, collection: 'qy_type' },
  { name: Actor.name, schema: ActorSchema, collection: 'qy_actor' },
  { name: Group.name, schema: GroupSchema, collection: 'qy_group' },
  { name: Comment.name, schema: CommentSchema, collection: 'qy_comment' },
  {
    name: Distribute.name,
    schema: DistributeSchema,
    collection: 'qy_distribute',
  },
  { name: Recharge.name, schema: RechargeSchema, collection: 'qy_recharge' },
  { name: Uact.name, schema: UactSchema, collection: 'qy_uact' },
  { name: Plog.name, schema: PlogSchema, collection: 'qy_plog' },
  { name: Mag.name, schema: MagSchema, collection: 'qy_mag' },
]);
