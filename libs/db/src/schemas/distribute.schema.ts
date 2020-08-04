import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 分销记录文档
@Schema({
  timestamps: {
    createdAt: 'distribute_time',
  },
})
export class Distribute extends Document {
  @ApiProperty({ description: '主用户id' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  user_id: number;
  @ApiProperty({ description: '接受分享用户id' })
  @Prop({
    type: Number,
    required: true,
  })
  user_id_1: number;
  @ApiProperty({ description: '类型,1浏览2注册' })
  @Prop({
    type: Number,
    index: true,
    required: true,
    enum: [1, 2, 3],
  })
  distribute_type: number;
  @ApiProperty({ description: '积分点数' })
  @Prop({
    type: Number,
    required: true,
  })
  distribute_points: number;
  @ApiProperty({ description: '备注' })
  @Prop({
    type: String,
  })
  distribute_remarks: string;
  @ApiProperty({ description: '出处 / 去向' })
  @Prop({
    type: Number,
    required: true,
    enum: [1, 2, 3],
  })
  distribute_io: number;
}

export const DistributeSchema = SchemaFactory.createForClass(Distribute);
