import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ExtraService } from '@libs/db/modules/extra/extra.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { object } from '@hapi/joi';

@ApiTags('设定')
@Controller('setting')
export class SettingController {
  constructor(private readonly extraService: ExtraService) {}
  // 获取设置
  @Get('get')
  getSetting() {
    return this.extraService.get();
  }
  // 更改设置
  @ApiBody({
    type: object,
  })
  @Post('set')
  setSetting(@Body() body) {
    let { path, value } = body;
    if (!path) return new BadRequestException('路径错误');
    return this.extraService.set(path, value);
  }
}
