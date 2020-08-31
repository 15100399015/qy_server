import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsMongoId, IsArray, IsString, IsBoolean, IsHexColor, IsUrl } from "class-validator";
export class VideoDto {
  @ApiProperty({ description: "顶级分类id" })
  @IsMongoId()
  type_id: string;
  @ApiProperty({ description: "二级分类id" })
  @IsMongoId()
  type_id_1: string;
  @ApiProperty({ description: "有权限访问此视频的用户组id" })
  @IsArray({ each: true })
  @IsMongoId()
  group_ids: string[];
  @ApiProperty({ description: "影片名称" })
  @IsString()
  video_name: string;
  @ApiProperty({ description: "副标题" })
  @IsString()
  video_sub: string;
  @ApiProperty({ description: "别名" })
  @IsString()
  video_en: string;
  @ApiProperty({ description: "影片状态" })
  @IsBoolean()
  video_status: boolean;
  @ApiProperty({ description: "首字母" })
  @IsHexColor()
  video_letter: string;
  @ApiProperty({ description: "高亮颜色标记" })
  @IsString()
  video_color: string;
  @ApiProperty({ description: "tag标签" })
  @IsArray({ each: true })
  @IsString()
  video_tag: string;
  @ApiProperty({ description: "扩展分类" })
  @IsArray({ each: true })
  @IsString()
  video_class: string;
  @ApiProperty({ description: "影片封面图" })
  @IsUrl()
  video_pic: string;
  @ApiProperty({ description: "缩略图" })
  @IsUrl()
  video_pic_thumb: string;
  @ApiProperty({ description: "海报图" })
  @IsUrl()
  video_pic_slide: string;
  @ApiProperty({ description: "主演" })
  video_actor: string[];
  @ApiProperty({ description: "导演" })
  video_director: string[];
  @ApiProperty({ description: "编剧" })
  video_writer: string[];
  @ApiProperty({ description: "幕后" })
  video_behind: string[];
  @ApiProperty({ description: "简介" })
  video_blurb: string;
  @ApiProperty({ description: "备注" })
  video_remarks: string;
  @ApiProperty({ description: "上映日期" })
  video_pubdate: string;
  @ApiProperty({ description: "总集数" })
  video_total: number;
  @ApiProperty({ description: "连载数" })
  video_serial: number;
  @ApiProperty({ description: "节目周期" })
  video_weekday: string;
  @ApiProperty({ description: "发行地区" })
  video_area: string;
  @ApiProperty({ description: "对白语言" })
  video_lang: string;
  @ApiProperty({ description: "上映年份" })
  video_year: number;
  @ApiProperty({ description: "影片版本" })
  video_version: string;
  @ApiProperty({ description: "资源类别" })
  video_state: string;
  @ApiProperty({ description: "是否完结" })
  video_isend: boolean;
  @ApiProperty({ description: "是否锁定" })
  video_lock: boolean;
  @ApiProperty({ description: "影片推荐程度" })
  video_level: number;
  @ApiProperty({ description: "视频时长" })
  video_duration: number;
  @ApiProperty({ description: "豆瓣id" })
  video_douban_id: number;
  @ApiProperty({ description: "豆瓣评分" })
  video_douban_score: number;
  @ApiProperty({ description: "关联视频" })
  video_rel_vod: number[];
  @ApiProperty({ description: "关联文章" })
  video_rel_art: number[];
  @ApiProperty({ description: "详细介绍" })
  video_content: string;
  @ApiProperty({ description: "播放地址" })
  video_play_url: string;
  @ApiProperty({ description: "下载地址" })
  video_down_url: string;
  @ApiProperty({ description: "总播放量" })
  video_hits: number;
  @ApiProperty({ description: "月播放量" })
  video_hits_month: number;
  @ApiProperty({ description: "周播放量" })
  video_hits_week: number;
  @ApiProperty({ description: "日播放量" })
  video_hits_day: number;
  @ApiProperty({ description: "平均分" })
  video_score: number;
  @ApiProperty({ description: "总评分" })
  video_score_all: number;
  @ApiProperty({ description: "总评次" })
  video_score_num: number;
  @ApiProperty({ description: "点赞数量" })
  video_up: number;
  @ApiProperty({ description: "踩数量" })
  video_down: number;
  @ApiProperty({ description: "播放器分组" })
  video_play_from: string;
  @ApiProperty({ description: "播放器组备注" })
  video_play_note: string;
  @ApiProperty({ description: "下载器分组" })
  video_down_from: string;
  @ApiProperty({ description: "下载器组备注" })
  video_down_note: string;
  @ApiProperty({ description: "版权" })
  video_copyright: string;
}
