import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

// 文章表
@Schema({ timestamps: { createdAt: "article_time_add", updatedAt: "article_time_up" } })
export class Article extends Document {
  // 一级分类id
  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  type_id: number;
  // 文章名字
  @Prop({
    type: SchemaTypes.String,
    index: true,
    required: true,
  })
  article_name: string;
  // 副标题
  @Prop({
    type: SchemaTypes.String,
    index: true,
  })
  article_sub: string;
  // 文章状态
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  article_status: boolean;
  // 首字母
  @Prop({
    type: SchemaTypes.String,
  })
  article_letter: string;
  // 高亮颜色
  @Prop({
    type: SchemaTypes.String,
  })
  article_color: string;
  // 来源
  @Prop({
    type: SchemaTypes.String,
  })
  article_from: string;
  // 作者
  @Prop({
    type: SchemaTypes.String,
  })
  article_author: string;
  // tag
  @Prop({
    type: [SchemaTypes.String],
  })
  article_tag: string[];
  // 扩展分类
  @Prop({
    type: [SchemaTypes.String],
  })
  article_class: string[];
  // 文章图片
  @Prop({
    type: SchemaTypes.String,
  })
  article_pic: string;
  // 缩略图
  @Prop({
    type: SchemaTypes.String,
  })
  article_pic_thumb: string;
  // 轮播图
  @Prop({
    type: SchemaTypes.String,
  })
  article_pic_slide: string;
  // 简介
  @Prop({
    type: SchemaTypes.String,
  })
  article_blurb: string;
  // 备注
  @Prop({
    type: SchemaTypes.String,
  })
  article_remarks: string;
  // 推荐程度
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
    min: 0,
    max: 10,
  })
  article_level: number;
  // 是否锁定
  @Prop({
    type: SchemaTypes.Boolean,
    default: false,
  })
  article_lock: boolean;
  // 点赞数量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_up: number;
  // 踩数量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_down: number;
  // 总浏览量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_hits: number;
  // 日浏览量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_hits_day: number;
  // 周浏览量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_hits_week: string;
  // 月浏览量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_hits_month: number;
  // 平均分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_score: number;
  // 总分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_score_all: number;
  // 总评次
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  article_score_num: number;
  // 关联文章
  @Prop({
    type: [SchemaTypes.String],
  })
  article_rel_art: number[];
  // 关联视频
  @Prop({
    type: [SchemaTypes.String],
  })
  article_rel_vod: number[];
  // 文章内容
  @Prop({
    type: SchemaTypes.String,
  })
  article_content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
export const ArticleDocName = "qy_" + Article.name.toLowerCase();
