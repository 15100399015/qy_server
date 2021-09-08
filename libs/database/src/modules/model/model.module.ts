import { MongooseModule } from "@nestjs/mongoose";
import {
  Setting,
  SettingSchema,
  SettingDocName,
  Video,
  VideoSchema,
  VideoDocName,
  User,
  UserSchema,
  UserDocName,
  Type,
  TypeSchema,
  TypeDocName,
  Topic,
  TopicSchema,
  TopicDocName,
  Gbook,
  GbookSchema,
  GbookDocName,
  Article,
  ArticleSchema,
  ArticleDocName,
  Admin,
  AdminSchema,
  AdminDocName,
  Comment,
  CommentSchema,
  CommentDocName,
  Uact,
  UactSchema,
  UactDocName,
} from "../../schemas";

function useFactory(schema) {
  return schema;
}

export const RootModel = MongooseModule.forFeatureAsync([
  {
    name: Setting.name,
    useFactory: () => useFactory(SettingSchema),
    collection: SettingDocName,
  },
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
    name: Comment.name,
    useFactory: () => useFactory(CommentSchema),
    collection: CommentDocName,
  },
  {
    name: Uact.name,
    useFactory: () => useFactory(UactSchema),
    collection: UactDocName,
  },
]);
