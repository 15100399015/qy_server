import { Crud } from "@admin/decorator/crud";
import { Topic } from "@lib/database/schemas";
import { Controller } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// 专题
@Crud({
  model: Topic,
})
@Controller("topic")
export class TopicController {
  constructor(@InjectModel(Topic.name) private readonly model: Model<Topic>) {}
}
