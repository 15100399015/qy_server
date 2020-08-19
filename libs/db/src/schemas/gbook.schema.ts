import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 留言文档
@Schema()
export class Gbook extends Document {
  @ApiProperty({ description: '留言id' })
  @Prop({
    type: Number,
    required: true,
  })
  gbook_id: number;
  @ApiProperty({ description: '留言类型, 1问题反馈,2求篇留言' })
  @Prop({
    type: Number,
    index: true,
    required: true,
    enum: [1, 2],
  })
  user_type: number;
  @ApiProperty({ description: '用户id' })
  @Prop({
    type: Number,
    index: true,
    default: 0,
  })
  user_id: number;
  @ApiProperty({ description: '留言状态' })
  @Prop({
    type: Boolean,
    required: true,
  })
  gbook_status: boolean;
  @ApiProperty({ description: '留言人昵称' })
  @Prop({
    type: String,
    required: true,
  })
  gbook_name: string;
  @ApiProperty({ description: '留言ip' })
  @Prop({
    type: Number,
  })
  gbook_ip: number;
  @ApiProperty({ description: '留言时间' })
  @Prop({
    type: Number,
    default: Date.now(),
  })
  gbook_time: number;
  @ApiProperty({ description: '回复时间' })
  @Prop({
    type: Number,
  })
  gbook_reply_time: number;
  @ApiProperty({ description: '留言内容' })
  @Prop({
    type: String,
  })
  gbook_content: string;
  @ApiProperty({ description: '回复内容' })
  @Prop({
    type: String,
  })
  gbook_reply: string;
}

export const GbookSchema = SchemaFactory.createForClass(Gbook);
export const GbookDocName = 'qy' + '_' + Gbook.name.toLowerCase();
