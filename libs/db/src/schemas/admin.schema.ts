import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

// 管理员表
@Schema()
export class Admin extends Document {
  @ApiProperty({ description: '管理员账号' })
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  admin_name: string;
  @ApiProperty({ description: '管理员密码' })
  @Prop({
    type: String,
    required: true,
    select: false,
    get: (val) => val,
    set(val: string) {
      return val ? hashSync(val) : val;
    },
  })
  admin_pwd: string;
  @ApiProperty({ description: '管理员权限' })
  @Prop({
    type: String,
    required: true,
  })
  admin_roles: string;
  @ApiProperty({ description: '管理员头像' })
  @Prop({
    type: String,
    default: '',
  })
  admin_portrait: string;
  @ApiProperty({ description: '个性签名' })
  @Prop({
    type: String,
    default: '',
  })
  admin_introduction: string;
  @ApiProperty({ description: '管理员状态' })
  @Prop({
    type: Boolean,
    default: true,
  })
  admin_status: boolean;
  @ApiProperty({ description: '管理员token' })
  @Prop({
    type: String,
    select: false,
    default: '',
  })
  admin_token: string;
  @ApiProperty({ description: '管理员邮箱' })
  @Prop({
    type: String,
    unique: true,
  })
  admin_email: string;
  @ApiProperty({ description: '管理员手机号' })
  @Prop({
    type: Number,
    unique: true,
  })
  admin_phone: number;
  @ApiProperty({ description: '登录历史' })
  @Prop({
    type: [
      {
        time: Number,
        ip: Number,
      },
    ],
    default: [],
  })
  admin_login_history: object[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
