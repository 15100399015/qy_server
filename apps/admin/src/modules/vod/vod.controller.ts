import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Video } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from '@admin/decorator/crud';
@ApiTags('影片')
@Crud({
  model: Video,
  decorators: [UseGuards(AuthGuard('jwt-admin'))],
})
@Controller('vod')
export class VodController {
  constructor(@InjectModel(Video.name) private readonly model: Model<Video>) {}
}
