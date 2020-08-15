import { UploadModule } from './modules/upload/upload.module';
import { AdminModule } from './modules/admin/admin.module';
import { Module } from '@nestjs/common';
import { CommonModule } from '@libs/common';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ArticleModule } from './modules/article/article.module';
import { VodModule } from './modules/vod/vod.module';
import { UserModule } from './modules/user/user.module';
import { TypeModule } from './modules/type/type.module';
import { GroupModule } from './modules/group/group.module';
import { SettingModule } from './modules/setting/setting.module';
import { RolesGuard } from './guard/roles.guard';
@Module({
  imports: [
    UploadModule,
    AdminModule,
    CommonModule,
    AuthModule,
    ArticleModule,
    VodModule,
    SettingModule,
    UserModule,
    TypeModule,
    GroupModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
