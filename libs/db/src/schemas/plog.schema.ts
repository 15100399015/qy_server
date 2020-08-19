import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 积分进出记录文档
@Schema({
  timestamps: {
    createdAt: 'plog_time',
  },
})
export class Plog extends Document {
  @ApiProperty({ description: '用户id' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  user_id: number;
  @ApiProperty({ description: '积分点数' })
  @Prop({
    type: Number,
    required: true,
  })
  plog_points: number;
  @ApiProperty({ description: '类型[增加，减少]' })
  @Prop({
    type: Number,
    required: true,
    enum: [1, 2],
  })
  plog_type: number;
  @ApiProperty({ description: '备注' })
  @Prop({
    type: String,
  })
  plog_remarks: string;
}

export const PlogSchema = SchemaFactory.createForClass(Plog);
export const PlogDocName =
  process.env.DATABASE_PREFIX + '_' + Plog.name.toLowerCase();
