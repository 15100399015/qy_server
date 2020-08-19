import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  toJSON: { virtuals: true },
})
export class Type extends Document {
  @ApiProperty({ description: '所属用户组,id数组' })
  @Prop({
    type: [
      {
        type: SchemaTypes.ObjectId,
      },
    ],
  })
  group_ids: string[];
  @ApiProperty({ description: '分类类型1影片,2文章' })
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    required: true,
    enum: [1, 2],
  })
  type_mid: number;
  @ApiProperty({ description: '分类名称' })
  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
  })
  type_name: string;
  @ApiProperty({ description: '别名' })
  @Prop({
    type: SchemaTypes.String,
  })
  type_en: string;
  @ApiProperty({ description: '排序' })
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  type_sort: number;
  @ApiProperty({ description: '父级分类id' })
  @Prop({
    type: SchemaTypes.String,
    default: '',
  })
  type_pid: string;
  @ApiProperty({ description: '分类状态' })
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  type_status: boolean;
  @ApiProperty({ description: '分类图标' })
  @Prop({
    type: SchemaTypes.String,
  })
  type_logo: string;
  @ApiProperty({ description: '分类封面' })
  @Prop({
    type: SchemaTypes.String,
  })
  type_pic: string;
  @ApiProperty({ description: '扩展信息' })
  @Prop({
    type: SchemaTypes.String,
  })
  type_extend: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
TypeSchema.virtual('children', {
  ref: Type.name,
  localField: '_id',
  foreignField: 'type_pid',
});
TypeSchema.virtual('type_mold').get(function (this: Type) {
  if (this.type_mid === 1) return '视频';
  if (this.type_mid === 2) return '文章';
  return this.type_mid;
});

export const TypeDocName = 'qy' + '_' + Type.name.toLowerCase();
