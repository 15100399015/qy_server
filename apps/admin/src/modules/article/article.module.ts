import { Module, forwardRef } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { AppModule } from '../../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [ArticleController],
})
export class ArticleModule {}
