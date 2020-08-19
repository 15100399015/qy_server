import { MongooseModule } from '@nestjs/mongoose';

import { Video, VideoSchema, VideoDocName } from '../../schemas/video.schema';
import { User, UserSchema, UserDocName } from '../../schemas/user.schema';
import { Type, TypeSchema, TypeDocName } from '../../schemas/type.schema';
import { Topic, TopicSchema, TopicDocName } from '../../schemas/topic.schema';
import { Gbook, GbookSchema, GbookDocName } from '../../schemas/gbook.schema';
import {
  Article,
  ArticleSchema,
  ArticleDocName,
} from '../../schemas/article.schema';
import { Admin, AdminSchema, AdminDocName } from '../../schemas/admin.schema';
import { Actor, ActorSchema, ActorDocName } from '../../schemas/actor.schema';
import { Group, GroupSchema, GroupDocName } from '../../schemas/group.schema';
import {
  Comment,
  CommentSchema,
  CommentDocName,
} from '../../schemas/comment.schema';
import { Uact, UactSchema, UactDocName } from '../../schemas/uact.schema';
import { Plog, PlogSchema, PlogDocName } from '../../schemas/plog.schema';
import {
  Recharge,
  RechargeSchema,
  RechargeDocName,
} from '../../schemas/recharge.schema';
import {
  Distribute,
  DistributeSchema,
  DistributeDocName,
} from '../../schemas/distribute.schema';
import { Mag, MagSchema, MagDocName } from '../../schemas/msg.schema';

function useFactory(schema) {
  return schema;
}

export const RootModel = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory: () => useFactory(UserSchema),
    collection: UserDocName,
  },
  {
    name: Video.name,
    useFactory: () => useFactory(VideoSchema),
    collection: VideoDocName,
  },
  {
    name: Article.name,
    useFactory: () => useFactory(ArticleSchema),
    collection: ArticleDocName,
  },
  {
    name: Gbook.name,
    useFactory: () => useFactory(GbookSchema),
    collection: GbookDocName,
  },
  {
    name: Admin.name,
    useFactory: () => useFactory(AdminSchema),
    collection: AdminDocName,
  },
  {
    name: Topic.name,
    useFactory: () => useFactory(TopicSchema),
    collection: TopicDocName,
  },
  {
    name: Type.name,
    useFactory: () => useFactory(TypeSchema),
    collection: TypeDocName,
  },
  {
    name: Actor.name,
    useFactory: () => useFactory(ActorSchema),
    collection: ActorDocName,
  },
  {
    name: Group.name,
    useFactory: () => useFactory(GroupSchema),
    collection: GroupDocName,
  },
  {
    name: Comment.name,
    useFactory: () => useFactory(CommentSchema),
    collection: CommentDocName,
  },
  {
    name: Distribute.name,
    useFactory: () => useFactory(DistributeSchema),
    collection: DistributeDocName,
  },
  {
    name: Recharge.name,
    useFactory: () => useFactory(RechargeSchema),
    collection: RechargeDocName,
  },
  {
    name: Uact.name,
    useFactory: () => useFactory(UactSchema),
    collection: UactDocName,
  },
  {
    name: Plog.name,
    useFactory: () => useFactory(PlogSchema),
    collection: PlogDocName,
  },
  {
    name: Mag.name,
    useFactory: () => useFactory(MagSchema),
    collection: MagDocName,
  },
]);
