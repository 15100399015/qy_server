import { Module } from '@nestjs/common';
import { DbModule } from '@libs/db';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { VodModule } from './modules/vod/vod.module';
import { UserModule } from './modules/user/user.module';
import { SettingModule } from './modules/setting/setting.module';
@Module({
  imports: [
    DbModule,
    AuthModule,
    ArticleModule,
    VodModule,
    SettingModule,
    UserModule,
  ],
  exports: [DbModule],
})
export class AppModule {}
