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
    get(val: string) {
      return val;
    },
    set(val: string) {
      return val ? hashSync(val) : val;
    },
  })
  admin_pwd: string;
  @ApiProperty({ description: '管理员权限' })
  @Prop({
    type: [String],
    required: true,
  })
  admin_roles: string[];
  @ApiProperty({ description: '管理员头像' })
  @Prop({
    type: String,
  })
  admin_portrait: string;
  @ApiProperty({ description: '要说的话' })
  @Prop({
    type: String,
  })
  admin_introduction: string;
  @ApiProperty({ description: '管理员状态' })
  @Prop({
    type: Boolean,
    default: true,
  })
  admin_status: boolean;
  @ApiProperty({ description: '登录记录' })
  @Prop({
    type: [
      {
        time: Number,
        ip: Number,
        xy: String,
        lat_lng: String,
      },
    ],
  })
  admin_login_history: object[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
