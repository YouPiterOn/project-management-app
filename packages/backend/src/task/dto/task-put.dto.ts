import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
  @IsUUID()
  assigneeId: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: TaskStatus;
}
