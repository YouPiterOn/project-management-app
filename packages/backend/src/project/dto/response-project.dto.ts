import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginatedTask } from 'src/task/dto/response-paginated-tasks.dto';

export class ResponseProjectDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ type: PaginatedTask, isArray: true })
  tasks?: PaginatedTask[];
}
