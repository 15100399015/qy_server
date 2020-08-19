import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { string } from '@hapi/joi';

// 用户组文档
@Schema()
export class Group extends Document {
  @ApiProperty({ description: '组名字' })
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  group_name: string;
  @ApiProperty({ description: '组状态 是否启用' })
  @Prop({
    type: Boolean,
    default: true,
  })
  group_status: boolean;
  @ApiProperty({ description: '用户组标识颜色' })
  @Prop({
    type: String,
  })
  group_color: string;
  @ApiProperty({ description: '用户组天积分' })
  @Prop({
    type: Number,
    default: 0,
  })
  group_points_day: number;
  @ApiProperty({ description: '用户组周积分' })
  @Prop({
    type: Number,
    default: 0,
  })
  group_points_week: number;
  @ApiProperty({ description: '用户组月积分' })
  @Prop({
    type: Number,
    default: 0,
  })
  group_points_month: number;
  @ApiProperty({ description: '用户组年积分' })
  @Prop({
    type: Number,
    default: 0,
  })
  group_points_year: number;
  @ApiProperty({ description: '用户组永久积分' })
  @Prop({
    type: Number,
    default: 0,
  })
  group_points_free: number;
  @ApiProperty({ description: '组备注' })
  @Prop({
    type: String,
    default: '',
  })
  group_remarks: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export const GroupDocName =
  process.env.DATABASE_PREFIX + '_' + Group.name.toLowerCase();
