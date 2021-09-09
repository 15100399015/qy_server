import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

// 操作记录表
@Schema({ timestamps: true })
export class Setting extends Document {
  @Prop({
    type: SchemaTypes.String,
    index: true,
    required: true,
    unique: true,
  })
  key: string;
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  value: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
export const SettingDocName = Setting.name.toLowerCase();
