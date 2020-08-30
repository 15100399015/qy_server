import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

@Schema({
  id: false,
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
})
export class Type extends Document {
  // 分类类型1影片,2文章
  @Prop({
    type: SchemaTypes.Number,
    index: true,
    required: true,
    enum: [1, 2],
  })
  type_mid: number;
  // 分类名称
  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
  })
  type_name: string;
  // 别名
  @Prop({
    type: SchemaTypes.String,
  })
  type_en: string;
  // 排序
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  type_sort: number;
  // 父级分类id
  @Prop({
    type: SchemaTypes.String,
    default: "",
  })
  type_pid: string;
  // 分类状态
  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
  })
  type_status: boolean;
  // 所属用户组,id数组
  @Prop({
    type: [
      {
        type: SchemaTypes.ObjectId,
      },
    ],
  })
  group_ids: string[];
  // 分类图标
  @Prop({
    type: SchemaTypes.String,
  })
  type_logo: string;
  // 分类封面
  @Prop({
    type: SchemaTypes.String,
  })
  type_pic: string;
  // 扩展信息
  @Prop({
    type: SchemaTypes.String,
  })
  type_extend: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
export const TypeDocName = "qy_" + Type.name.toLowerCase();
TypeSchema.virtual("children", {
  ref: Type.name,
  localField: "_id",
  foreignField: "type_pid",
});
TypeSchema.virtual("type_mold").get(function (this: Type) {
  return {
    name: this.type_mid === 1 ? "视频" : this.type_mid === 2 && "文章",
    type_mid: this.type_mid,
  };
});
