import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsBoolean, IsInt, Min, IsHexColor, IsDefined } from "class-validator";

export class GroupDto {
  @ApiProperty({ description: "链接组名字" })
  @IsDefined({ groups: ["create"] })
  @IsString({ always: true })
  @Length(2, 10, { always: true })
  group_name: string;
  @ApiProperty({ description: "组状态 是否启用" })
  @IsBoolean({ always: true })
  group_status: boolean;
  @ApiProperty({ description: "用户组标识颜色" })
  @IsHexColor({ always: true })
  group_color: string;
  @ApiProperty({ description: "用户组天积分" })
  @IsInt({ always: true })
  @Min(0, { always: true })
  group_points_day: number;
  @ApiProperty({ description: "用户组周积分" })
  @IsInt({ always: true })
  @Min(0, { always: true })
  group_points_week: number;
  @ApiProperty({ description: "用户组月积分" })
  @IsInt({ always: true })
  @Min(0, { always: true })
  group_points_month: number;
  @ApiProperty({ description: "用户组年积分" })
  @IsInt({ always: true })
  @Min(0, { always: true })
  group_points_year: number;
  @ApiProperty({ description: "用户组永久积分" })
  @IsInt({ always: true })
  @Min(0, { always: true })
  group_points_free: number;
  @ApiProperty({ description: "组备注" })
  @IsString({ always: true })
  group_remarks: string;
}
