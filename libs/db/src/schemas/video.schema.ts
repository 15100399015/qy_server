import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// 视频表
@Schema({
  timestamps: {
    // 创建时间
    createdAt: 'video_time_add',
    // 更新时间
    updatedAt: 'video_time_up',
  },
})
export class Video extends Document {
  @ApiProperty({
    description: '影片唯一id',
    required: false,
  })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  video_id: number;
  @ApiProperty({
    description: '顶级分类id',
  })
  @Prop({
    type: Number,
    index: true,
    required: true,
  })
  type_id: number;
  @ApiProperty({
    description: '二级分类id',
  })
  @Prop({
    type: Number,
    index: true,
  })
  type_id_1: number;
  @ApiProperty({
    description: '有权限访问此视频的用户组id',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  group_id: number;
  @ApiProperty({
    description: '影片名称',
  })
  @Prop({
    type: String,
    index: true,
    required: true,
  })
  video_name: string;
  @ApiProperty({
    description: '副标题',
  })
  @Prop({
    type: String,
    index: true,
  })
  video_sub: string;
  @ApiProperty({
    description: '别名',
  })
  @Prop({
    type: String,
    index: true,
  })
  video_en: string;
  @ApiProperty({
    description: '影片状态',
  })
  @Prop({
    type: Boolean,
    required: true,
  })
  video_status: boolean;
  @ApiProperty({
    description: '首字母',
  })
  @Prop({
    type: String,
  })
  video_letter: string;
  @ApiProperty({
    description: '高亮颜色标记',
  })
  @Prop({
    type: String,
  })
  video_color: string;
  @ApiProperty({
    description: 'tag标签',
  })
  @Prop({
    type: String,
  })
  video_tag: string;
  @ApiProperty({
    description: '扩展分类',
  })
  @Prop({
    type: String,
  })
  video_class: string;
  @ApiProperty({
    description: '影片封面图',
  })
  @Prop({
    type: String,
  })
  video_pic: string;
  @ApiProperty({
    description: '缩略图',
  })
  @Prop({
    type: String,
  })
  video_pic_thumb: string;
  @ApiProperty({
    description: '海报图',
  })
  @Prop({
    type: String,
  })
  video_pic_slide: string;
  @ApiProperty({
    description: '主演',
  })
  @Prop({
    type: [String],
  })
  video_actor: string[];
  @ApiProperty({
    description: '导演',
  })
  @Prop({
    type: [String],
  })
  video_director: string[];
  @ApiProperty({
    description: '编剧',
  })
  @Prop({
    type: [String],
  })
  video_writer: string[];
  @ApiProperty({
    description: '幕后',
  })
  @Prop({
    type: [String],
  })
  video_behind: string[];
  @ApiProperty({
    description: '简介',
  })
  @Prop({
    type: String,
  })
  video_blurb: string;
  @ApiProperty({
    description: '备注',
  })
  @Prop({
    type: String,
  })
  video_remarks: string;
  @ApiProperty({
    description: '上映日期',
  })
  @Prop({
    type: String,
  })
  video_pubdate: string;
  @ApiProperty({
    description: '总集数',
  })
  @Prop({
    type: Number,
  })
  video_total: number;
  @ApiProperty({
    description: '连载数',
  })
  @Prop({
    type: Number,
  })
  video_serial: number;
  @ApiProperty({
    description: '节目周期',
  })
  @Prop({
    type: String,
  })
  video_weekday: string;
  @ApiProperty({
    description: '发行地区',
  })
  @Prop({
    type: String,
  })
  video_area: string;
  @ApiProperty({
    description: '对白语言',
  })
  @Prop({
    type: String,
  })
  video_lang: string;
  @ApiProperty({
    description: '上映年份',
  })
  @Prop({
    type: Number,
  })
  video_year: number;
  @ApiProperty({
    description: '影片版本',
  })
  @Prop({
    type: String,
    default: 'HD',
  })
  video_version: string;
  @ApiProperty({
    description: '资源类别',
  })
  @Prop({
    type: String,
  })
  video_state: string;
  @ApiProperty({
    description: '是否完结',
  })
  @Prop({
    type: Boolean,
  })
  video_isend: boolean;
  @ApiProperty({
    description: '是否锁定',
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  video_lock: boolean;
  @ApiProperty({
    description: '影片推荐程度',
  })
  @Prop({
    type: Number,
    index: true,
    default: 0,
  })
  video_level: number;
  @ApiProperty({
    description: '视频时长',
  })
  @Prop({
    type: Number,
  })
  video_duration: number;
  @ApiProperty({
    description: '豆瓣id',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_douban_id: number;
  @ApiProperty({
    description: '豆瓣评分',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_douban_score: number;
  @ApiProperty({
    description: '关联视频',
    type: [Number],
  })
  @Prop({
    type: [Number],
  })
  video_rel_vod: number[];
  @ApiProperty({
    description: '关联文章',
    type: [Number],
  })
  @Prop({
    type: [Number],
  })
  video_rel_art: number[];
  @ApiProperty({
    description: '详细介绍',
  })
  @Prop({
    type: String,
  })
  video_content: string;
  @ApiProperty({
    description: '播放地址',
  })
  @Prop({
    type: String,
    default: '',
  })
  video_play_url: string;
  @ApiProperty({
    description: '下载地址',
  })
  @Prop({
    type: String,
    default: '',
  })
  video_down_url: string;
  @ApiProperty({
    description: '总播放量',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_hits: number;
  @ApiProperty({
    description: '月播放量',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_hits_month: number;
  @ApiProperty({
    description: '周播放量',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_hits_week: number;
  @ApiProperty({
    description: '日播放量',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_hits_day: number;
  @ApiProperty({
    description: '平均分',
    default: 0,
  })
  @Prop({
    type: Number,
  })
  video_score: number;
  @ApiProperty({
    description: '总评分',
  })
  //
  @Prop({
    type: Number,
    default: 0,
  })
  video_score_all: number;
  @ApiProperty({
    description: '总评次',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_score_num: number;
  @ApiProperty({
    description: '点赞数量',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_up: number;
  @ApiProperty({
    description: '踩数量',
  })
  @Prop({
    type: Number,
    default: 0,
  })
  video_down: number;
  @ApiProperty({
    description: '播放器分组',
  })
  @Prop()
  video_play_from: string;
  @ApiProperty({
    description: '播放器组备注',
  })
  @Prop({
    type: String,
  })
  video_play_note: string;
  @ApiProperty({
    description: '下载器分组',
  })
  @Prop()
  video_down_from: string;
  @ApiProperty({
    description: '下载器组备注',
  })
  @Prop({
    type: String,
  })
  video_down_note: string;
  @ApiProperty({
    description: '版权',
  })
  @Prop({
    type: String,
  })
  video_copyright: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
