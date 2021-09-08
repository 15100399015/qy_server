import { Controller } from "@nestjs/common";
import { Crud } from "@admin/decorator/crud";
import { Comment } from "@lib/database/schemas";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

// 评论
@Crud({
  model: Comment,
})
@Controller("comment")
export class CommentController {
  constructor(@InjectModel(Comment.name) private readonly model: Model<Comment>) {}
}
