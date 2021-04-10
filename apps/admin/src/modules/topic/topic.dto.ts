import { IsInt, IsBoolean, IsString, IsOptional, IsArray } from "class-validator";

export class TopicCreateDto {
  // 标题
  @IsString()
  topic_name: string;
  // 副标题
  @IsOptional()
  @IsString()
  topic_sub: string;
  // 推荐值
  @IsOptional()
  @IsInt()
  topic_level: number;
  // 高亮标记颜色
  @IsOptional()
  @IsString()
  topic_color: string;
  // 封面图片
  @IsOptional()
  @IsString()
  topic_pic: string;
  // 缩略图
  @IsOptional()
  @IsString()
  topic_pic_thumb: string;
  // 幻灯图
  @IsOptional()
  @IsString()
  topic_pic_slide: string;
  // 简介
  @IsOptional()
  @IsString()
  topic_blurb: string;
  // 备注
  @IsOptional()
  @IsString()
  topic_remarks: string;
  // 扩展分类
  @IsOptional()
  @IsArray()
  topic_class: string[];
  // 扩展tag
  @IsOptional()
  @IsArray()
  topic_tag: string[];
  // 关联视频
  @IsOptional()
  @IsArray()
  topic_rel_vod: string[];
  // 关联文章
  @IsOptional()
  @IsArray()
  topic_rel_art: string[];
  // 详情介绍
  @IsOptional()
  @IsString()
  topic_content: string;
}

export class TopicUpDateDto {
  // 标题
  @IsOptional()
  @IsString()
  topic_name: string;
  // 副标题
  @IsOptional()
  @IsString()
  topic_sub: string;
  // 推荐值
  @IsOptional()
  @IsInt()
  topic_level: number;
  // 高亮标记颜色
  @IsOptional()
  @IsString()
  topic_color: string;
  // 封面图片
  @IsOptional()
  @IsString()
  topic_pic: string;
  // 缩略图
  @IsOptional()
  @IsString()
  topic_pic_thumb: string;
  // 幻灯图
  @IsOptional()
  @IsString()
  topic_pic_slide: string;
  // 简介
  @IsOptional()
  @IsString()
  topic_blurb: string;
  // 备注
  @IsOptional()
  @IsString()
  topic_remarks: string;
  // 扩展分类
  @IsOptional()
  @IsArray()
  topic_class: string[];
  // 扩展tag
  @IsOptional()
  @IsArray()
  topic_tag: string[];
  // 关联视频
  @IsOptional()
  @IsArray()
  topic_rel_vod: string[];
  // 关联文章
  @IsOptional()
  @IsArray()
  topic_rel_art: string[];
  // 详情介绍
  @IsOptional()
  @IsString()
  topic_content: string;
}
