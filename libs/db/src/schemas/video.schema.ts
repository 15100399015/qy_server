import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// 视频表
@Schema({
  timestamps: {
    createdAt: "video_time_add",
    updatedAt: "video_time_up",
  },
})
export class Video extends Document {
  //顶级分类id
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  type_id: number;
  //二级分类id
  @Prop({
    type: Number,
    index: true,
  })
  type_id_1: number;
  //有权限访问此视频的用户组id
  @Prop({
    type: [String],
  })
  group_id: string[];
  //影片名称
  @Prop({
    type: String,
    index: true,
    required: true,
  })
  video_name: string;
  //副标题
  @Prop({
    type: String,
    index: true,
  })
  video_sub: string;
  //别名
  @Prop({
    type: String,
    index: true,
  })
  video_en: string;
  //影片状态
  @Prop({
    type: Boolean,
    required: true,
  })
  video_status: boolean;
  //首字母
  @Prop({
    type: String,
  })
  video_letter: string;
  //高亮颜色标记
  @Prop({
    type: String,
  })
  video_color: string;
  //tag标签
  @Prop({
    type: String,
  })
  video_tag: string;
  //扩展分类
  @Prop({
    type: String,
  })
  video_class: string;
  //影片封面图
  @Prop({
    type: String,
  })
  video_pic: string;
  //缩略图
  @Prop({
    type: String,
  })
  video_pic_thumb: string;
  //海报图
  @Prop({
    type: String,
  })
  video_pic_slide: string;
  //主演
  @Prop({
    type: [String],
  })
  video_actor: string[];
  //导演
  @Prop({
    type: [String],
  })
  video_director: string[];
  //编剧
  @Prop({
    type: [String],
  })
  video_writer: string[];
  //幕后
  @Prop({
    type: [String],
  })
  video_behind: string[];
  //简介
  @Prop({
    type: String,
  })
  video_blurb: string;
  //备注
  @Prop({
    type: String,
  })
  video_remarks: string;
  //上映日期
  @Prop({
    type: String,
  })
  video_pubdate: string;
  //总集数
  @Prop({
    type: Number,
  })
  video_total: number;
  //连载数
  @Prop({
    type: Number,
  })
  video_serial: number;
  //节目周期
  @Prop({
    type: String,
  })
  video_weekday: string;
  //发行地区
  @Prop({
    type: String,
  })
  video_area: string;
  //对白语言
  @Prop({
    type: String,
  })
  video_lang: string;
  //上映年份
  @Prop({
    type: Number,
  })
  video_year: number;
  //影片版本
  @Prop({
    type: String,
    default: "HD",
  })
  video_version: string;
  //资源类别
  @Prop({
    type: String,
  })
  video_state: string;
  //是否完结
  @Prop({
    type: Boolean,
  })
  video_isend: boolean;
  //是否锁定
  @Prop({
    type: Boolean,
    default: false,
  })
  video_lock: boolean;
  //影片推荐程度
  @Prop({
    type: Number,
    index: true,
    default: 0,
  })
  video_level: number;
  //视频时长
  @Prop({
    type: Number,
  })
  video_duration: number;
  //豆瓣id
  @Prop({
    type: Number,
    default: 0,
  })
  video_douban_id: number;
  //豆瓣评分
  @Prop({
    type: Number,
    default: 0,
  })
  video_douban_score: number;
  //关联视频
  @Prop({
    type: [Number],
  })
  video_rel_vod: number[];
  //关联文章",
  @Prop({
    type: [Number],
  })
  video_rel_art: number[];
  //详细介绍
  @Prop({
    type: String,
  })
  video_content: string;
  //播放地址
  @Prop({
    type: String,
    default: "",
  })
  video_play_url: string;
  //下载地址
  @Prop({
    type: String,
    default: "",
  })
  video_down_url: string;
  //总播放量
  @Prop({
    type: Number,
    default: 0,
  })
  video_hits: number;
  //月播放量
  @Prop({
    type: Number,
    default: 0,
  })
  video_hits_month: number;
  //周播放量
  @Prop({
    type: Number,
    default: 0,
  })
  video_hits_week: number;
  //日播放量
  @Prop({
    type: Number,
    default: 0,
  })
  video_hits_day: number;
  //平均分",
  @Prop({
    type: Number,
  })
  video_score: number;
  //总评分
  @Prop({
    type: Number,
    default: 0,
  })
  video_score_all: number;
  //总评次
  @Prop({
    type: Number,
    default: 0,
  })
  video_score_num: number;
  //点赞数量
  @Prop({
    type: Number,
    default: 0,
  })
  video_up: number;
  //踩数量
  @Prop({
    type: Number,
    default: 0,
  })
  video_down: number;
  //播放器分组
  @Prop()
  video_play_from: string;
  //播放器组备注
  @Prop({
    type: String,
  })
  video_play_note: string;
  //下载器分组
  @Prop()
  video_down_from: string;
  //下载器组备注
  @Prop({
    type: String,
  })
  video_down_note: string;
  //版权
  @Prop({
    type: String,
  })
  video_copyright: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
export const VideoDocName = "qy_" + Video.name.toLowerCase();
