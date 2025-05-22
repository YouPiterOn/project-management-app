import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class TaskFiltersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
