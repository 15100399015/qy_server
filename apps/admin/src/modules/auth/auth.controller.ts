import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('管理员')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: '登录' })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto, @Req() req) {
    return req.user;
  }
}
