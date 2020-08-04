import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Video } from '@libs/db/schemas';
import { Crud } from '../../decorator/crud';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@ApiTags('影片')
@Crud({
  model: Video,
})
@Controller('vod')
export class VodController {
  constructor(@InjectModel(Video.name) private readonly model: Model<Video>) {}
}
