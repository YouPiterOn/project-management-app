import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../enums/task-status.enum";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class TaskPatchDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  assigneeId?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: TaskStatus;
}