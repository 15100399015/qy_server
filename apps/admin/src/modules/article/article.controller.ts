import { Controller, UseGuards } from '@nestjs/common';
import { Article } from '@libs/db/schemas';
import { Crud } from '../../decorator/crud';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文章')
@Crud({
  model: Article,
  decorators: [UseGuards(AuthGuard('jwt-admin'))],
})
@Controller('article')
export class ArticleController {
  constructor(
    @InjectModel(Article.name) private readonly model: Model<Article>,
  ) {}
}
