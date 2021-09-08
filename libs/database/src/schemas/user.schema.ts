import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

// 用户表
@Schema()
export class User extends Document {
  // 用户名
  @Prop({
    type: SchemaTypes.String,
    index: true,
    required: true,
  })
  user_name: string;
  // 密码
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  user_pwd: string;
  // 用户昵称
  @Prop({
    type: SchemaTypes.String,
  })
  user_nick_name: string;
  // 性别
  @Prop({
    type: SchemaTypes.String,
  })
  user_sex: string;
  // 生日
  @Prop({
    type: SchemaTypes.String,
  })
  user_birthday: string;
  // 个性签名
  @Prop({
    type: SchemaTypes.String,
  })
  user_sign: string;
  // 用户手机号
  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  user_phone: number;
  // 用户状态
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  user_status: boolean;
  // 用户头像
  @Prop({
    type: SchemaTypes.String,
  })
  user_portrait: string;
  // 头像缩略图
  @Prop({
    type: SchemaTypes.String,
  })
  user_portrait_thumb: string;
  // 用户随机标识
  @Prop({
    type: SchemaTypes.String,
  })
  user_random: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserDocName = User.name.toLowerCase();
