import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 用户表
@Schema()
export class User extends Document {
  @ApiProperty({ description: '用户组信息' })
  @Prop({
    type: {
      group_id: Number,
      start_time: Number,
      end_time: Number,
    },
    required: true,
  })
  group_info: Number;
  @ApiProperty({ description: '用户名' })
  @Prop({
    type: String,
    index: true,
    required: true,
  })
  user_name: string;
  @ApiProperty({ description: '密码' })
  @Prop({
    type: String,
    required: true,
  })
  user_pwd: string;
  @ApiProperty({ description: '用户昵称' })
  @Prop({
    type: String,
  })
  user_nick_name: string;
  @ApiProperty({ description: '性别' })
  @Prop({
    type: String,
  })
  user_sex: string;
  @ApiProperty({ description: '生日' })
  @Prop({
    type: String,
  })
  user_birthday: string;
  @ApiProperty({ description: '星座' })
  @Prop({
    type: String,
  })
  user_starsign: string;
  @ApiProperty({ description: '个性签名' })
  @Prop({
    type: String,
  })
  user_sign: string;

  @ApiProperty({ description: '用户qq号' })
  @Prop({
    type: Number,
  })
  user_qq: number;
  @ApiProperty({ description: '用户邮箱' })
  @Prop({
    type: String,
  })
  user_email: string;
  @ApiProperty({ description: '用户手机号' })
  @Prop({
    type: Number,
    required: true,
  })
  user_phone: number;
  @ApiProperty({ description: '用户状态' })
  @Prop({
    type: Boolean,
    default: true,
  })
  user_status: boolean;
  @ApiProperty({ description: '用户头像' })
  @Prop({
    type: String,
  })
  user_portrait: string;
  @ApiProperty({ description: '头像缩略图' })
  @Prop({
    type: String,
  })
  user_portrait_thumb: string;
  @ApiProperty({ description: 'qqopenid 用于qq登录' })
  @Prop({
    type: String,
  })
  user_openid_qq: string;
  @ApiProperty({ description: 'weixinopenid 用于微信登录' })
  @Prop({
    type: String,
  })
  user_openid_weixin: string;
  @ApiProperty({ description: '用户随机标识' })
  @Prop({
    type: String,
  })
  user_random: string;
  @ApiProperty({ description: '用户积分' })
  @Prop({
    type: Number,
    default: 10,
  })
  user_points: number;
  @ApiProperty({ description: '注册信息' })
  @Prop({
    type: {
      time: Number,
      ip: Number,
      lat_lng: String,
      device: String,
      model: String,
    },
    required: true,
  })
  user_reg_info: object;
  @ApiProperty({ description: '用户标签' })
  @Prop({
    type: String,
  })
  user_tag: String;
  @ApiProperty({ description: '用户偏好' })
  @Prop({
    type: [String],
  })
  user_pre: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserDocName = 'qy' + '_' + User.name.toLowerCase();
