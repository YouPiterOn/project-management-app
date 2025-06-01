import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class TaskCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  assigneeId?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: TaskStatus;
}
