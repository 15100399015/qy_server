import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 分类表
@Schema()
export class Type extends Document {
  @ApiProperty({ description: '所属用户组' })
  @Prop({
    type: [String],
  })
  group_id: string[];
  @ApiProperty({ description: '分类类型1影片,2文章' })
  @Prop({
    type: Number,
    index: true,
    required: true,
    enum: [1, 2],
  })
  type_mid: number;
  @ApiProperty({ description: '分类名称' })
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  type_name: string;
  @ApiProperty({ description: '别名' })
  @Prop({
    type: String,
  })
  type_en: string;
  @ApiProperty({ description: '排序' })
  @Prop({
    type: Number,
    default: 0,
  })
  type_sort: number;
  @ApiProperty({ description: '父级分类id 0表示一级分类' })
  @Prop({
    type: String,
    default: '',
  })
  type_pid: string;
  @ApiProperty({ description: '分类状态' })
  @Prop({
    type: Boolean,
    default: true,
  })
  type_status: boolean;
  @ApiProperty({ description: '分类图标' })
  @Prop({
    type: String,
  })
  type_logo: string;
  @ApiProperty({ description: '分类封面' })
  @Prop({
    type: String,
  })
  type_pic: string;
  @ApiProperty({ description: '扩展信息' })
  @Prop({
    type: String,
  })
  type_extend: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
export const TypeDocName =
  process.env.DATABASE_PREFIX + '_' + Type.name.toLowerCase();
