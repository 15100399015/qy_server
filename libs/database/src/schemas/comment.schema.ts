import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

// 评论表
@Schema({ timestamps: { createdAt: "comment_time" } })
export class Comment extends Document {
  // 评论所在的模块类型, 视频,文章
  @Prop({
    type: SchemaTypes.Number,
    required: true,
    enum: [1, 2],
  })
  comment_mid: number;
  // 所在内容id,可以是视频id 或文章id等等
  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  comment_rid: number;
  // 如果这条评论是回复, 这里就是父评论id
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  comment_pid: number;
  // 用户id
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    required: true,
  })
  user_id: number;
  // 评论状态,是否通过审核
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  comment_status: boolean;
  // 评论名/用户名
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  comment_name: string;
  // 评论内容
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  comment_content: string;
  // 赞
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  comment_up: number;
  // 踩
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  comment_down: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
export const CommentDocName = Comment.name.toLowerCase();
