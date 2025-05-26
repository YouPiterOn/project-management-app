import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class TaskPutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: TaskStatus;
}
