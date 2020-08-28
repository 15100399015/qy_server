import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import {
  IsString,
  IsBoolean,
  IsRgbColor,
  IsInt,
  Min,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 用户组文档
@Schema({
  versionKey: false,
  id: false,
})
export class Group extends Document {
  @ApiProperty({ description: '组名字' })
  @IsString()
  @Length(2, 10)
  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
  })
  group_name: string;
  @ApiProperty({ description: '组状态 是否启用' })
  @IsBoolean()
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  group_status: boolean;
  @ApiProperty({ description: '用户组标识颜色' })
  @IsRgbColor()
  @Prop({
    type: SchemaTypes.String,
  })
  group_color: string;
  @ApiProperty({ description: '用户组天积分' })
  @IsInt()
  @Min(0)
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_day: number;
  @ApiProperty({ description: '用户组周积分' })
  @IsInt()
  @Min(0)
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_week: number;
  @ApiProperty({ description: '用户组月积分' })
  @IsInt()
  @Min(0)
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_month: number;
  @ApiProperty({ description: '用户组年积分' })
  @IsInt()
  @Min(0)
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_year: number;
  @ApiProperty({ description: '用户组永久积分' })
  @IsInt()
  @Min(0)
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  group_points_free: number;
  @ApiProperty({ description: '组备注' })
  @IsString()
  @Prop({
    type: SchemaTypes.String,
    default: '',
  })
  group_remarks: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export const GroupDocName = 'qy_' + Group.name.toLowerCase();
