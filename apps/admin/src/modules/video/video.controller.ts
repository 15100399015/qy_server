import { Controller } from "@nestjs/common";
import { Video } from "@lib/database/schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Crud } from "@admin/decorator/crud";

//影片
@Crud({
  model: Video,
})
@Controller("video")
export class VideoController {
  constructor(@InjectModel(Video.name) private readonly model: Model<Video>) {}
}
