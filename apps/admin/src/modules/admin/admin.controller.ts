import { Controller, UseGuards } from '@nestjs/common';
import { Admin } from '@libs/db/schemas/admin.schema';
import { Crud } from '@admin/decorator/crud';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('管理员')
@Crud({
  model: Admin,
})
@Controller('admin')
export class AdminController {
  constructor(@InjectModel(Admin.name) private readonly model: Model<Admin>) {}
}
