import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { update } from 'lodash';

// 文章表
@Schema({
  timestamps: {
    // 创建时间
    createdAt: 'article_time_add',
    // 更新时间
    updatedAt: 'article_time_up',
  },
})
export class Article extends Document {
  @ApiProperty({ description: '文章id' })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  article_id: number;
  @ApiProperty({ description: '一级分类id' })
  @Prop({
    type: Number,
    required: true,
  })
  type_id: number;
  @ApiProperty({ description: '二级分类id' })
  @Prop({
    type: Number,
  })
  type_id_1: number;
  @ApiProperty({ description: '分组id' })
  @Prop({
    type: [String],
    required: true,
  })
  group_id: string[];
  @ApiProperty({ description: '文章名字' })
  @Prop({
    type: String,
    index: true,
    required: true,
  })
  article_name: string;
  @ApiProperty({ description: '副标题' })
  @Prop({
    type: String,
    index: true,
  })
  article_sub: string;
  @ApiProperty({ description: '中文全拼' })
  @Prop({
    type: String,
    index: true,
  })
  article_en: string;
  @ApiProperty({ description: '文章状态' })
  @Prop({
    type: Boolean,
    default: true,
  })
  article_status: boolean;
  @ApiProperty({ description: '首字母' })
  @Prop({
    type: String,
  })
  article_letter: string;
  @ApiProperty({ description: '高亮颜色' })
  @Prop({
    type: String,
  })
  article_color: string;
  @ApiProperty({ description: '来源' })
  @Prop({
    type: String,
  })
  article_from: string;
  @ApiProperty({ description: '作者' })
  @Prop({
    type: String,
  })
  article_author: string;
  @ApiProperty({ description: 'tag' })
  @Prop({
    type: String,
  })
  article_tag: string;
  @ApiProperty({ description: '扩展分类' })
  @Prop({
    type: String,
  })
  article_class: string;
  @ApiProperty({ description: '文章图片' })
  @Prop({
    type: String,
  })
  article_pic: string;
  @ApiProperty({ description: '缩略图' })
  @Prop({
    type: String,
  })
  article_pic_thumb: string;
  @ApiProperty({ description: '轮播图' })
  @Prop({
    type: String,
  })
  article_pic_slide: string;
  @ApiProperty({ description: '简介' })
  @Prop({
    type: String,
  })
  article_blurb: string;
  @ApiProperty({ description: '备注' })
  @Prop({
    type: String,
  })
  article_remarks: string;
  @ApiProperty({ description: '推荐程度' })
  @Prop({
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  })
  article_level: number;
  @ApiProperty({ description: '是否锁定' })
  @Prop({
    type: Boolean,
    default: false,
  })
  article_lock: boolean;
  @ApiProperty({ description: '点赞数量' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_up: number;
  @ApiProperty({ description: '踩数量' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_down: number;
  @ApiProperty({ description: '总浏览量' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_hits: number;
  @ApiProperty({ description: '日浏览量' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_hits_day: number;
  @ApiProperty({ description: '周浏览量' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_hits_week: string;
  @ApiProperty({ description: '月浏览量' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_hits_month: number;
  @ApiProperty({ description: '平均分' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_score: number;
  @ApiProperty({ description: '总分' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_score_all: number;
  @ApiProperty({ description: '总评次' })
  @Prop({
    type: Number,
    default: 0,
  })
  article_score_num: number;
  @ApiProperty({ description: '关联文章' })
  @Prop({
    type: [Number],
  })
  article_rel_art: number[];
  @ApiProperty({ description: '关联视频' })
  @Prop({
    type: [Number],
  })
  article_rel_vod: number[];
  @ApiProperty({ description: '文章内容' })
  @Prop({
    type: String,
  })
  article_content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
export const ArticleDocName = 'qy' + '_' + Article.name.toLowerCase();
