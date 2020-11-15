import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

// 专题表
@Schema({ timestamps: { createdAt: "topic_time_add", updatedAt: "topic_time_up" } })
export class Topic extends Document {
  // 专题名称
  @Prop({
    type: SchemaTypes.String,
    index: true,
    required: true,
  })
  topic_name: string;
  // 副标题
  @Prop({
    type: SchemaTypes.String,
  })
  topic_sub: string;
  // 专题状态
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  topic_status: boolean;
  // 排序
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  topic_sort: number;
  // 高亮标记颜色
  @Prop({
    type: SchemaTypes.String,
  })
  topic_color: string;
  // 封面图片
  @Prop({
    type: SchemaTypes.String,
  })
  topic_pic: string;
  // 缩略图
  @Prop({
    type: SchemaTypes.String,
  })
  topic_pic_thumb: string;
  // 幻灯图
  @Prop({
    type: SchemaTypes.String,
  })
  topic_pic_slide: string;
  // 简介
  @Prop({
    type: SchemaTypes.String,
  })
  topic_blurb: string;
  // 备注
  @Prop({
    type: SchemaTypes.String,
  })
  topic_remarks: string;
  // 扩展分类
  @Prop({
    type: [SchemaTypes.String],
  })
  topic_class: string[];
  // 扩展tag
  @Prop({
    type: [SchemaTypes.String],
  })
  topic_tag: string[];
  // 关联视频
  @Prop({
    type: [SchemaTypes.Number],
  })
  topic_rel_vod: number[];
  // 关联文章
  @Prop({
    type: [SchemaTypes.Number],
  })
  topic_rel_art: number[];
  // 详情介绍
  @Prop({
    type: SchemaTypes.String,
  })
  topic_content: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
export const TopicDocName = "qy_" + Topic.name.toLowerCase();
