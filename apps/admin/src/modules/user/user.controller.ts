import { Controller, UsePipes } from '@nestjs/common';
import { User } from '@libs/db/schemas';
import { Crud } from '../../decorator/crud';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('用户')
@Crud({
  model: User,
})
@Controller('user')
export class UserController {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}
}
