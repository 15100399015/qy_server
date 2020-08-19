import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

// 演员文档
@Schema({
  timestamps: {
    //创建时间
    createdAt: 'actor_time_add',
    // 更新时间
    updatedAt: 'actor_time_up',
  },
})
export class Actor extends Document {
  @ApiProperty({ description: '演员名字' })
  @Prop({
    type: String,
    index: true,
    required: true,
  })
  actor_name: string;
  @ApiProperty({ description: '中文名全拼' })
  @Prop({
    type: String,
    index: true,
  })
  actor_en: string;
  @ApiProperty({ description: '别名' })
  @Prop({
    type: String,
    index: true,
  })
  actor_alias: string;
  @ApiProperty({ description: '演员状态' })
  @Prop({
    type: Boolean,
    default: true,
  })
  actor_status: boolean;
  @ApiProperty({ description: '是否锁定' })
  @Prop({
    type: Boolean,
    default: false,
  })
  actor_lock: boolean;
  @ApiProperty({ description: '首字母' })
  @Prop({
    type: String,
  })
  actor_letter: string;
  @ApiProperty({ description: '性别' })
  @Prop({
    type: String,
  })
  actor_sex: string;
  @ApiProperty({ description: '高亮颜色' })
  @Prop({
    type: String,
  })
  actor_color: string;
  @ApiProperty({ description: '演员图片' })
  @Prop({
    type: String,
  })
  actor_pic: string;
  @ApiProperty({ description: '简介' })
  @Prop({
    type: String,
  })
  actor_blurb: string;
  @ApiProperty({ description: '备注' })
  @Prop({
    type: String,
  })
  actor_remarks: string;
  @ApiProperty({ description: '地区' })
  @Prop({
    type: String,
  })
  actor_area: string;
  @ApiProperty({ description: '身高' })
  @Prop({
    type: String,
  })
  actor_height: string;
  @ApiProperty({ description: '体重' })
  @Prop({
    type: String,
  })
  actor_weight: string;
  @ApiProperty({ description: '生日' })
  @Prop({
    type: String,
  })
  actor_birthday: string;
  @ApiProperty({ description: '出生地' })
  @Prop({
    type: String,
  })
  actor_birtharea: string;
  @ApiProperty({ description: '血型' })
  @Prop({
    type: String,
  })
  actor_blood: string;
  @ApiProperty({ description: '星座' })
  @Prop({
    type: String,
  })
  actor_starsign: string;
  @ApiProperty({ description: '毕业学校' })
  @Prop({
    type: String,
  })
  actor_school: string;
  @ApiProperty({ description: '代表作' })
  @Prop({
    type: [String],
  })
  actor_works: string[];
  @ApiProperty({ description: 'tag 标签' })
  @Prop({
    type: String,
  })
  actor_tag: string;
  @ApiProperty({ description: '作品相关分类' })
  @Prop({
    type: String,
  })
  actor_class: string;
  @ApiProperty({ description: '演员热度' })
  @Prop({
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  })
  actor_heat: number;
  @ApiProperty({ description: '点赞数量' })
  @Prop({
    type: Number,
    default: 0,
  })
  actor_up: number;
  @ApiProperty({ description: '踩数量' })
  @Prop({
    type: Number,
    default: 0,
  })
  actor_down: number;
  @ApiProperty({ description: '演员详细介绍' })
  @Prop({
    type: String,
  })
  actor_content: string;
}

export const ActorSchema = SchemaFactory.createForClass(Actor);
export const ActorDocName = 'qy' + '_' + Actor.name.toLowerCase();
