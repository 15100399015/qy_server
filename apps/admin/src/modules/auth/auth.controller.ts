import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from '../../decorator/crud';
import { Admin } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@ApiTags('管理员')
@Crud({
  model: Admin,
})
@Controller('auth')
export class AuthController {
  constructor(@InjectModel(Admin.name) private readonly model: Model<Admin>) {}
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() dto, @Req() req) {
    console.log(dto);
    return req.user;
  }
}
