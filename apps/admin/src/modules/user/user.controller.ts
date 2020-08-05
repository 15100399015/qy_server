import { Controller, UseGuards } from '@nestjs/common';
import { User } from '@libs/db/schemas';
import { Crud } from '../../decorator/crud';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Crud({
  model: User,
  decorators: [UseGuards(AuthGuard('jwt-admin'))],
})
@Controller('user')
export class UserController {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}
}
