import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 操作记录表
@Schema({
  timestamps: {
    createdAt: 'uact_time',
  },
})
export class Uact extends Document {
  @ApiProperty({ description: '触发此操作的用户' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  user_id: number;
  @ApiProperty({ description: '操作类型1收藏,2观看,3下载' })
  @Prop({
    type: Number,
    index: true,
    required: true,
    enum: [1, 2, 3],
  })
  uact_type: number;
  @ApiProperty({ description: '分类类型，文章还是视频，和type表对应' })
  @Prop({
    type: Number,
    index: true,
    required: true,
    enum: [1, 2],
  })
  uact_mid: number;
  @ApiProperty({ description: '所在内容id，可以是视频id后文章id' })
  @Prop({
    type: Number,
    default: 0,
  })
  uact_rid: number;
}

export const UactSchema = SchemaFactory.createForClass(Uact);
