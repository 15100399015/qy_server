import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
// 留言文档
@Schema({ timestamps: { createdAt: "gbook_time" } })
export class Gbook extends Document {
  // 留言类型, 1问题反馈,2求篇留言
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    required: true,
    enum: [1, 2],
  })
  gbook_type: number;
  // 用户id
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    default: 0,
  })
  user_id: number;
  // 留言过审
  @Prop({
    type: SchemaTypes.Boolean,
    required: true,
  })
  gbook_status: boolean;
  // 留言内容
  @Prop({
    type: SchemaTypes.String,
  })
  gbook_content: string;
  // 是否回复
  @Prop({
    type: SchemaTypes.Number,
  })
  gbook_reply_status: boolean;
  // 回复时间
  @Prop({
    type: SchemaTypes.Number,
  })
  gbook_reply_time: number;
  // 回复内容
  @Prop({
    type: SchemaTypes.String,
  })
  gbook_reply: string;
}

export const GbookSchema = SchemaFactory.createForClass(Gbook);
export const GbookDocName = "qy_" + Gbook.name.toLowerCase();
