import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsMongoId, IsBoolean, IsArray, IsUrl, IsString } from "class-validator";

export class TypeDto {
  @ApiProperty({ description: "分类类型1影片,2文章" })
  @IsEnum([1, 2])
  type_mid: number;
  @ApiProperty({ description: "分类名称" })
  type_name: string;
  @ApiProperty({ description: "别名" })
  type_en: string;
  @ApiProperty({ description: "排序" })
  @IsInt()
  type_sort: number;
  @ApiProperty({ description: "父级分类id" })
  @IsMongoId()
  type_pid: string;
  @ApiProperty({ description: "分类状态" })
  @IsBoolean()
  type_status: boolean;
  @ApiProperty({ description: "所属用户组,id数组" })
  @IsArray()
  group_ids: string[];
  @ApiProperty({ description: "分类图标" })
  @IsUrl()
  type_logo: string;
  @ApiProperty({ description: "分类封面" })
  @IsUrl()
  type_pic: string;
  @ApiProperty({ description: "扩展信息" })
  @IsString()
  type_extend: string;
}
