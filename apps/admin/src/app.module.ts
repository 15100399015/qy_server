import { Module } from "@nestjs/common";
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CommonModule } from "@lib/common";

import { AuthGuard } from "./guard/auto.guard";
import { HttpExceptionsFilter } from "./exception/http-exception.filter";
import { ResponseInterceptor } from "./interceptor/response.interceptor";

import { UploadModule } from "./modules/upload/upload.module";
import { AdminModule } from "./modules/admin/admin.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ArticleModule } from "./modules/article/article.module";
import { VideoModule } from "./modules/video/video.module";
import { UserModule } from "./modules/user/user.module";
import { TypeModule } from "./modules/type/type.module";
import { SettingModule } from "./modules/setting/setting.module";
import { CommentModule } from "./modules/comment/comment.module";
import { UactModule } from "./modules/uact/uact.module";
import { GbookModule } from "./modules/gbook/gbook.module";
import { TopicModule } from "./modules/topic/topic.module";

@Module({
  imports: [TopicModule, GbookModule, UactModule, CommentModule, UploadModule, AdminModule, CommonModule, AuthModule, ArticleModule, VideoModule, SettingModule, UserModule, TypeModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: HttpExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
