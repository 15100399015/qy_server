import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 信息表
@Schema({
  timestamps: {
    createdAt: 'msg_time',
  },
})
export class Mag extends Document {
  @ApiProperty({ description: '消息id' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  msg_id: number;
  @ApiProperty({ description: '用户id' })
  @Prop({
    type: Number,
  })
  user_id: number;
  @ApiProperty({ description: '消息类型' })
  @Prop({
    type: Number,
  })
  msg_type: number;
  @ApiProperty({ description: '消息状态' })
  @Prop({
    type: Number,
  })
  msg_status: number;
  @ApiProperty({ description: '来源/去向' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  msg_to: number;
  @ApiProperty({ description: '信息码' })
  @Prop({
    type: Boolean,
    default: true,
  })
  msg_code: boolean;
  @ApiProperty({ description: '信息内容' })
  @Prop({
    type: String,
  })
  msg_content: string;
}

export const MagSchema = SchemaFactory.createForClass(Mag);
export const MagDocName =
  process.env.DATABASE_PREFIX + '_' + Mag.name.toLowerCase();
