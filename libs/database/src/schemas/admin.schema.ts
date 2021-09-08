import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { hashSync } from "bcryptjs";

// 管理员表
@Schema()
export class Admin extends Document {
  // 管理员账号
  @Prop({
    type: SchemaTypes.String,
    required: true,
    min: 6,
    unique: true,
  })
  admin_name: string;
  // 管理员密码
  @Prop({
    type: SchemaTypes.String,
    required: true,
    select: false,
    get: (val) => val,
    set: (val) => (val ? hashSync(val) : val),
  })
  admin_pwd: string;
  // 管理员权限
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  admin_roles: string;
  // 管理员状态
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  admin_status?: boolean;
  // 管理员token
  @Prop({
    type: SchemaTypes.String,
    select: false,
    default: "",
  })
  admin_token?: string;
  // 管理员邮箱
  @Prop({
    type: SchemaTypes.String,
  })
  admin_email?: string;
  // 管理员手机号
  @Prop({
    type: SchemaTypes.Number,
  })
  admin_phone?: number;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
export const AdminDocName = Admin.name.toLowerCase();
