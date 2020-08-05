import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExtraService } from '@libs/db/modules/extra/extra.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { object } from '@hapi/joi';

@ApiTags('设定')
@Controller('setting')
export class SettingController {
  constructor(private readonly extraService: ExtraService) {}
  // 获取设置
  @Get()
  getSetting() {
    return this.extraService.get();
  }
  // 更改设置
  @ApiBody({
    type: object,
  })
  @Post()
  setSetting(@Body() body) {
    let { path, value } = body;
    return this.extraService.set(path, value);
  }
}
