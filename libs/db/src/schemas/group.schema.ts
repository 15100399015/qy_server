import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
// 用户组文档
@Schema({
  versionKey: false,
  id: false,
})
export class Group extends Document {
  // 组名字
  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
  })
  group_name: string;
  // 组状态 是否启用
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  group_status: boolean;
  // 用户组标识颜色
  @Prop({
    type: SchemaTypes.String,
  })
  group_color: string;
  // 用户组天积分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_day: number;
  // 用户组周积分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_week: number;
  // 用户组月积分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_month: number;
  // 用户组年积分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_year: number;
  // 用户组永久积分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_free: number;
  // 组备注
  @Prop({
    type: SchemaTypes.String,
    default: "",
  })
  group_remarks: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export const GroupDocName = "qy_" + Group.name.toLowerCase();
