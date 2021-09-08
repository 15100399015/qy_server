import { Crud } from "@admin/decorator/crud";
import { Gbook } from "@lib/database/schemas";
import { Controller } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// 留言
@Crud({
  model: Gbook,
})
@Controller("gbook")
export class GbookController {
  constructor(@InjectModel(Gbook.name) private readonly model: Model<Gbook>) {}
}
