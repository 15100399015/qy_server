import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsBoolean, IsRgbColor, IsInt, Min } from "class-validator";

export class GroupDto {
  @ApiProperty({ description: "组名字" })
  @IsString()
  @Length(2, 10)
  group_name: string;
  @ApiProperty({ description: "组状态 是否启用" })
  @IsBoolean()
  group_status: boolean;
  @ApiProperty({ description: "用户组标识颜色" })
  @IsRgbColor()
  group_color: string;
  @ApiProperty({ description: "用户组天积分" })
  @IsInt()
  @Min(0)
  p_points_day: number;
  @ApiProperty({ description: "用户组周积分" })
  @IsInt()
  @Min(0)
  group_points_week: number;
  @ApiProperty({ description: "用户组月积分" })
  @IsInt()
  @Min(0)
  group_points_month: number;
  @ApiProperty({ description: "用户组年积分" })
  @IsInt()
  @Min(0)
  group_points_year: number;
  @ApiProperty({ description: "用户组永久积分" })
  @IsInt()
  @Min(0)
  group_points_free: number;
  @ApiProperty({ description: "组备注" })
  @IsString()
  group_remarks: string;
}
