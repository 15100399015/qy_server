import { Controller } from "@nestjs/common";
import { Article } from "@lib/database/schemas";
import { Crud } from "@admin/decorator/crud";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

// 文章
@Crud({
  model: Article,
  routes: {
    find: true,
  },
})
@Controller("article")
export class ArticleController {
  constructor(@InjectModel(Article.name) private readonly model: Model<Article>) {}
}
