import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 评论表
@Schema({ timestamps: { createdAt: 'comment_time' } })
export class Comment extends Document {
  @ApiProperty({ description: '评论id' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  comment_id: number;
  @ApiProperty({ description: '评论所在的模块类型, 视频,文章' })
  @Prop({
    type: Number,
    required: true,
    enum: [1, 2],
  })
  comment_mid: number;
  @ApiProperty({ description: '所在内容id,可以是视频id 或文章id等等' })
  @Prop({
    type: Number,
    required: true,
  })
  comment_rid: number;
  @ApiProperty({ description: '如果这条评论是回复, 这里就是父评论id' })
  @Prop({
    type: Number,
    default: 0,
  })
  comment_pid: number;
  @ApiProperty({ description: '用户id' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  user_id: number;
  @ApiProperty({ description: '评论状态,是否通过审核' })
  @Prop({
    type: Boolean,
    default: true,
  })
  comment_status: boolean;
  @ApiProperty({ description: '评论名/用户名' })
  @Prop({
    type: String,
    required: true,
  })
  comment_name: string;
  @ApiProperty({ description: 'ip' })
  @Prop({
    type: Number,
    required: true,
  })
  comment_ip: number;
  @ApiProperty({ description: '评论内容' })
  @Prop({
    type: String,
    required: true,
  })
  comment_content: string;
  @ApiProperty({ description: '点赞' })
  @Prop({
    type: Number,
    default: 0,
  })
  comment_up: number;
  @ApiProperty({ description: '踩' })
  @Prop({
    type: Number,
    default: 0,
  })
  comment_down: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
export const CommentDocName = 'qy' + '_' + Comment.name.toLowerCase();
