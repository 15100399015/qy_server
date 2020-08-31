import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Video } from "@libs/db/schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Crud } from "@admin/decorator/crud";
import { Roles } from "@admin/decorator/roles.decorator";
@ApiTags("影片")
@Crud({
  model: Video,
  routes: {
    find: {
      decorators: [Roles("admin")],
    },
  },
})
@Controller("video")
export class VideoController {
  constructor(@InjectModel(Video.name) private readonly model: Model<Video>) {}
}
