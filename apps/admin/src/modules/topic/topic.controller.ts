import { Topic } from "@lib/database/schemas";
import { Controller } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Controller("topic")
export class TopicController {
  constructor(@InjectModel(Topic.name) private readonly model: Model<Topic>) {}
}
