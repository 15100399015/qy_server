import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

// 操作记录表
@Schema({ timestamps: { createdAt: "uact_time" } })
export class Uact extends Document {
  // 触发此操作的用户
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    required: true,
  })
  user_id: number;
  // 1收藏,2观看,3下载
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    required: true,
    enum: [1, 2, 3],
  })
  uact_type: number;
  // 文章还是视频，和type表对应
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    required: true,
    enum: [1, 2],
  })
  uact_mid: number;
  // 视频id或文章id
  @Prop({
    type: SchemaTypes.String,
    default: 0,
  })
  uact_rid: string;
}

export const UactSchema = SchemaFactory.createForClass(Uact);
export const UactDocName = Uact.name.toLowerCase();
