import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Video } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crud } from '@admin/decorator/crud';
import { Roles } from '@admin/decorator/roles.decorator';
import OSS from 'ali-oss';
@ApiTags('影片')
@Crud({
  model: Video,
  routes: {
    find: {
      decorators: [Roles('admin')],
    },
  },
})
@Controller('vod')
export class VodController {
  constructor(@InjectModel(Video.name) private readonly model: Model<Video>) {
    new OSS({
      region: 'qycmsadmin@1938695811778053.onaliyun.com',
      accessKeyId: 'LTAI4GHu14Hdp6nLtEDTirGo',
      accessKeySecret: 'KfEmISOW9u7qB4fQpc3S9bE3JRXYyQ',
      bucket: 'qycms',
    });
  }
}
