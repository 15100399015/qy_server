import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

// 视频表
@Schema({ timestamps: { createdAt: "video_time_add", updatedAt: "video_time_up" } })
export class Video extends Document {
  //顶级分类id
  @Prop({
    type: SchemaTypes.String,
    index: true,
    required: true,
  })
  type_id: string;
  //影片名称
  @Prop({
    type: SchemaTypes.String,
    index: true,
    required: true,
  })
  video_name: string;
  //副标题
  @Prop({
    type: SchemaTypes.String,
    index: true,
  })
  video_sub: string;
  //影片状态
  @Prop({
    type: SchemaTypes.Boolean,
    required: true,
  })
  video_status: boolean;
  //首字母
  @Prop({
    type: SchemaTypes.String,
  })
  video_letter: string;
  //高亮颜色标记
  @Prop({
    type: SchemaTypes.String,
  })
  video_color: string;
  //tag标签
  @Prop({
    type: [SchemaTypes.String],
  })
  video_tag: string[];
  //扩展分类
  @Prop({
    type: [SchemaTypes.String],
  })
  video_class: string[];
  //影片封面图
  @Prop({
    type: SchemaTypes.String,
  })
  video_pic: string;
  //缩略图
  @Prop({
    type: SchemaTypes.String,
  })
  video_pic_thumb: string;
  //海报图
  @Prop({
    type: SchemaTypes.String,
  })
  video_pic_slide: string;
  //主演
  @Prop({
    type: [SchemaTypes.String],
  })
  video_actor: string[];
  //导演
  @Prop({
    type: [SchemaTypes.String],
  })
  video_director: string[];
  //编剧
  @Prop({
    type: [SchemaTypes.String],
  })
  video_writer: string[];
  //幕后
  @Prop({
    type: [SchemaTypes.String],
  })
  video_behind: string[];
  //简介
  @Prop({
    type: SchemaTypes.String,
  })
  video_blurb: string;
  //备注
  @Prop({
    type: SchemaTypes.String,
  })
  video_remarks: string;
  //上映日期
  @Prop({
    type: SchemaTypes.String,
  })
  video_pubdate: string;
  //总集数
  @Prop({
    type: SchemaTypes.Number,
  })
  video_total: number;
  //连载数
  @Prop({
    type: SchemaTypes.Number,
  })
  video_serial: number;
  //节目周期
  @Prop({
    type: SchemaTypes.String,
  })
  video_weekday: string;
  //发行地区
  @Prop({
    type: SchemaTypes.String,
  })
  video_area: string;
  //对白语言
  @Prop({
    type: SchemaTypes.String,
  })
  video_lang: string;
  //上映年份
  @Prop({
    type: SchemaTypes.Number,
  })
  video_year: number;
  //影片版本
  @Prop({
    type: SchemaTypes.String,
    default: "HD",
  })
  video_version: string;
  //资源类别
  @Prop({
    type: SchemaTypes.String,
  })
  video_state: string;
  //是否完结
  @Prop({
    type: SchemaTypes.Boolean,
  })
  video_isend: boolean;
  //是否锁定
  @Prop({
    type: SchemaTypes.Boolean,
    default: false,
  })
  video_lock: boolean;
  //影片推荐程度
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    default: 0,
  })
  video_level: number;
  //视频时长
  @Prop({
    type: SchemaTypes.Number,
  })
  video_duration: number;
  //豆瓣id
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_douban_id: number;
  //豆瓣评分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_douban_score: number;
  //关联视频
  @Prop({
    type: [SchemaTypes.String],
  })
  video_rel_vod: string[];
  //关联文章",
  @Prop({
    type: [SchemaTypes.String],
  })
  video_rel_art: string[];
  //详细介绍
  @Prop({
    type: SchemaTypes.String,
  })
  video_content: string;
  //总播放量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_hits: number;
  //月播放量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_hits_month: number;
  //周播放量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_hits_week: number;
  //日播放量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_hits_day: number;
  //平均分",
  @Prop({
    type: SchemaTypes.Number,
  })
  video_score: number;
  //总评分
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_score_all: number;
  //总评次
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_score_num: number;
  //点赞数量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_up: number;
  //踩数量
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  video_down: number;
  //播放器分组
  @Prop({
    type: SchemaTypes.String,
    default: "",
  })
  video_play_from: string;
  //下载器分组
  @Prop({
    type: SchemaTypes.String,
    default: "",
  })
  video_down_from: string;
  //播放地址
  @Prop({
    type: SchemaTypes.String,
    default: "",
  })
  video_play_url: string;
  //下载地址
  @Prop({
    type: SchemaTypes.String,
    default: "",
  })
  video_down_url: string;
  //版权
  @Prop({
    type: SchemaTypes.String,
  })
  video_copyright: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
export const VideoDocName = Video.name.toLowerCase();
