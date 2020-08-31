import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsBoolean, IsInt, Min, IsHexColor, IsOptional } from "class-validator";

export class GroupDto {
  @ApiProperty({ description: "组名字" })
  @IsString()
  @Length(2, 10)
  group_name: string;
  @ApiProperty({ description: "组状态 是否启用" })
  @IsOptional({ groups: ["update", "create"] })
  @IsBoolean()
  group_status: boolean;
  @ApiProperty({ description: "用户组标识颜色" })
  @IsOptional({ groups: ["update", "create"] })
  @IsHexColor()
  group_color: string;
  @ApiProperty({ description: "用户组天积分" })
  @IsOptional({ groups: ["update", "create"] })
  @IsInt()
  @Min(0)
  group_points_day: number;
  @ApiProperty({ description: "用户组周积分" })
  @IsOptional({ groups: ["update", "create"] })
  @IsInt()
  @Min(0)
  group_points_week: number;
  @ApiProperty({ description: "用户组月积分" })
  @IsOptional({ groups: ["update", "create"] })
  @IsInt()
  @Min(0)
  group_points_month: number;
  @ApiProperty({ description: "用户组年积分" })
  @IsOptional({ groups: ["update", "create"] })
  @IsInt()
  @Min(0)
  group_points_year: number;
  @ApiProperty({ description: "用户组永久积分" })
  @IsOptional({ groups: ["update", "create"] })
  @IsInt()
  @Min(0)
  group_points_free: number;
  @ApiProperty({ description: "组备注" })
  @IsOptional({ groups: ["update", "create"] })
  @IsString()
  group_remarks: string;
}
