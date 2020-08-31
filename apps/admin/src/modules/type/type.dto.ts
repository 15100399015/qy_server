import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsMongoId, IsBoolean, IsArray, IsUrl, IsString, IsDefined } from "class-validator";

export class TypeDto {
  @ApiProperty({ description: "分类类型1影片,2文章" })
  @IsDefined({ groups: ["create"] })
  @IsEnum([1, 2], { always: true })
  type_mid: number;
  @ApiProperty({ description: "分类名称" })
  @IsDefined({ groups: ["create"] })
  @IsString({ always: true })
  type_name: string;
  @ApiProperty({ description: "别名" })
  @IsString({ always: true })
  type_en: string;
  @ApiProperty({ description: "排序" })
  @IsInt({ always: true })
  type_sort: number;
  @ApiProperty({ description: "父级分类id" })
  @IsMongoId({ always: true })
  type_pid: string;
  @ApiProperty({ description: "分类状态" })
  @IsBoolean({ always: true })
  type_status: boolean;
  @ApiProperty({ description: "所属用户组,id数组" })
  @IsArray({ always: true })
  group_ids: string[];
  @ApiProperty({ description: "分类图标" })
  @IsUrl({}, { always: true })
  type_logo: string;
  @ApiProperty({ description: "分类封面" })
  @IsUrl({}, { always: true })
  type_pic: string;
  @ApiProperty({ description: "扩展信息" })
  @IsString({ always: true })
  type_extend: string;
}
