import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

// 管理员表
@Schema()
export class Admin extends Document {
  @ApiProperty({ description: '管理员id' })
  @Prop({
    type: Number,
    required: true,
  })
  admin_id: number;
  @ApiProperty({ description: '管理员账号' })
  @Prop({
    type: String,
    required: true,
  })
  admin_name: string;
  @ApiProperty({ description: '管理员密码' })
  @Prop({
    type: String,
    required: true,
    get(val) {
      return val;
    },
    set(val: string) {
      return val ? hashSync(val) : val;
    },
  })
  admin_pwd: string;
  @ApiProperty({ description: '随机值标识' })
  @Prop({
    type: String,
  })
  admin_random: string;
  @ApiProperty({ description: '管理员状态' })
  @Prop({
    type: Boolean,
    default: true,
  })
  admin_status: boolean;
  @ApiProperty({ description: '授权' })
  @Prop({
    type: String,
  })
  admin_auth: string;
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
  @ApiProperty({ description: '最后一次登录信息' })
  @Prop({
    type: {
      time: Number,
      ip: Number,
      xy: String,
      lat_lng: String,
    },
  })
  admin_last_login: object;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
