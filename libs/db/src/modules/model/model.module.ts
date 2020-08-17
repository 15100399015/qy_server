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

function useFactory(schema) {
  return schema;
}

export const RootModel = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory: () => useFactory(UserSchema),
    collection: 'qy_user',
  },
  {
    name: Video.name,
    useFactory: () => useFactory(VideoSchema),
    collection: 'qy_video',
  },
  {
    name: Article.name,
    useFactory: () => useFactory(ArticleSchema),
    collection: 'qy_article',
  },
  {
    name: Gbook.name,
    useFactory: () => useFactory(GbookSchema),
    collection: 'qy_gbook',
  },
  {
    name: Admin.name,
    useFactory: () => useFactory(AdminSchema),
    collection: 'qy_admin',
  },
  {
    name: Topic.name,
    useFactory: () => useFactory(TopicSchema),
    collection: 'qy_topic',
  },
  {
    name: Type.name,
    useFactory: () => useFactory(TypeSchema),
    collection: 'qy_type',
  },
  {
    name: Actor.name,
    useFactory: () => useFactory(ActorSchema),
    collection: 'qy_actor',
  },
  {
    name: Group.name,
    useFactory: () => useFactory(GroupSchema),
    collection: 'qy_group',
  },
  {
    name: Comment.name,
    useFactory: () => useFactory(CommentSchema),
    collection: 'qy_comment',
  },
  {
    name: Distribute.name,
    useFactory: () => useFactory(DistributeSchema),
    collection: 'qy_distribute',
  },
  {
    name: Recharge.name,
    useFactory: () => useFactory(RechargeSchema),
    collection: 'qy_recharge',
  },
  {
    name: Uact.name,
    useFactory: () => useFactory(UactSchema),
    collection: 'qy_uact',
  },
  {
    name: Plog.name,
    useFactory: () => useFactory(PlogSchema),
    collection: 'qy_plog',
  },
  {
    name: Mag.name,
    useFactory: () => useFactory(MagSchema),
    collection: 'qy_mag',
  },
]);
