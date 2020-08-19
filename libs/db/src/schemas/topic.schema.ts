import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 专题表
@Schema({
  timestamps: {
    createdAt: 'topic_time_add',
    updatedAt: 'topic_time_up',
  },
})
export class Topic extends Document {
  @ApiProperty({ description: '专题id' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  topic_id: number;
  @ApiProperty({ description: '所属用户组' })
  @Prop({
    type: [String],
  })
  group_id: string[];
  @ApiProperty({ description: '关联分类id, 0代表不属于任何分类' })
  @Prop({
    type: Number,
    index: true,
    default: 0,
  })
  topic_type: number;
  @ApiProperty({ description: '专题名称' })
  @Prop({
    type: String,
    index: true,
    required: true,
  })
  topic_name: string;
  @ApiProperty({ description: '中文全拼' })
  @Prop({
    type: String,
  })
  topic_en: string;
  @ApiProperty({ description: '副标题' })
  @Prop({
    type: String,
  })
  topic_sub: string;
  @ApiProperty({ description: '专题状态' })
  @Prop({
    type: Boolean,
    default: true,
  })
  topic_status: boolean;
  @ApiProperty({ description: '排序' })
  @Prop({
    type: Number,
    default: 0,
  })
  topic_sort: number;
  @ApiProperty({ description: '首字母' })
  @Prop({
    type: String,
  })
  topic_letter: string;
  @ApiProperty({ description: '高亮标记颜色' })
  @Prop({
    type: String,
  })
  topic_color: string;
  @ApiProperty({ description: '封面图片' })
  @Prop({
    type: String,
  })
  topic_pic: string;
  @ApiProperty({ description: '缩略图' })
  @Prop({
    type: String,
  })
  topic_pic_thumb: string;
  @ApiProperty({ description: '幻灯图' })
  @Prop({
    type: String,
  })
  topic_pic_slide: string;
  @ApiProperty({ description: '简介' })
  @Prop({
    type: String,
  })
  topic_blurb: string;
  @ApiProperty({ description: '备注' })
  @Prop({
    type: String,
  })
  topic_remarks: string;
  @ApiProperty({ description: '推荐等级' })
  @Prop({
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  })
  topic_level: number;
  @ApiProperty({ description: '赞数量' })
  @Prop({
    type: Number,
    default: 0,
  })
  topic_up: number;
  @ApiProperty({ description: '踩数量' })
  @Prop({
    type: Number,
    default: 0,
  })
  @ApiProperty({ description: '总浏览量' })
  @Prop({
    type: Number,
    default: 0,
  })
  topic_hits: number;
  @ApiProperty({ description: '日浏览量' })
  @Prop({
    type: Number,
    default: 0,
  })
  topic_hits_day: number;
  @ApiProperty({ description: '周浏览量' })
  @Prop({
    type: Number,
    default: 0,
  })
  topic_hits_week: number;
  @ApiProperty({ description: '月浏览量' })
  @Prop({
    type: Number,
    default: 0,
  })
  topic_hits_month: number;
  @ApiProperty({ description: '扩展分类' })
  @Prop({
    type: String,
  })
  topic_class: number;
  @ApiProperty({ description: 'tag' })
  @Prop({
    type: String,
  })
  topic_tag: string;
  @ApiProperty({ description: '关联视频' })
  @Prop({
    type: [Number],
  })
  topic_rel_vod: number[];
  @ApiProperty({ description: '关联文章' })
  @Prop({
    type: [Number],
  })
  topic_rel_art: number[];
  @ApiProperty({ description: '详情' })
  @Prop({
    type: String,
  })
  topic_content: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
export const TopicDocName =
  process.env.DATABASE_PREFIX + '_' + Topic.name.toLowerCase();
