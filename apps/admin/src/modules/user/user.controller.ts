import { Controller } from "@nestjs/common";
import { User } from "@lib/database/schemas";
import { Crud } from "@admin/decorator/crud";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// 用户
@Crud({
  model: User,
})
@Controller("user")
export class UserController {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}
}
