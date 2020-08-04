import { Module } from '@nestjs/common';
import { CommonModule } from '@libs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { VodModule } from './modules/vod/vod.module';
import { UserModule } from './modules/user/user.module';
import { SettingModule } from './modules/setting/setting.module';
import { JwtStrategy } from './service/jwt.strategy';
@Module({
  imports: [
    CommonModule,
    AuthModule,
    ArticleModule,
    VodModule,
    SettingModule,
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
