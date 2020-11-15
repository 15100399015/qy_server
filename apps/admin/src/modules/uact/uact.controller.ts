import { Crud } from "@admin/decorator/crud";
import { Uact } from "@lib/database/schemas";
import { Controller } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// 操作记录
@Crud({
  model: Uact,
})
@Controller("uact")
export class UactController {
  constructor(@InjectModel(Uact.name) private readonly model: Model<Uact>) {}
}
