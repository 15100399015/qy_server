import { IsEnum, IsInt, IsBoolean, IsUrl, IsString, IsOptional } from "class-validator";

export class TypeCreateDto {
  // 分类类型1影片,2文章
  @IsEnum([1, 2])
  type_mid: number;
  // 分类名称
  @IsString()
  type_name: string;
  // 别名
  @IsOptional()
  @IsString()
  type_sub: string;
  // 排序
  @IsOptional()
  @IsInt()
  type_sort: number;
  // 父级分类id
  @IsOptional()
  @IsString()
  type_pid: string;
  // 分类状态
  @IsOptional()
  @IsBoolean()
  type_status: boolean;
  // 分类图标
  @IsOptional()
  @IsUrl({})
  type_logo: string;
  // 分类封面
  @IsOptional()
  @IsUrl({})
  type_pic: string;
  // 扩展信息
  @IsOptional()
  @IsString()
  type_extend: string;
}

export class TypeUpDateDto {
  // 分类名称
  @IsOptional()
  @IsString()
  type_name: string;
  // 别名
  @IsOptional()
  @IsString()
  type_sub: string;
  // 排序
  @IsOptional()
  @IsInt()
  type_sort: number;
  // 分类状态
  @IsOptional()
  @IsBoolean()
  type_status: boolean;
  // 分类图标
  @IsOptional()
  @IsUrl()
  type_logo: string;
  // 分类封面
  @IsOptional()
  @IsUrl()
  type_pic: string;
  // 扩展信息
  @IsOptional()
  @IsString()
  type_extend: string;
}
