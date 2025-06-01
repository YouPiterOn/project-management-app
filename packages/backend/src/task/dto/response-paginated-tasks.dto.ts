import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatedDto } from 'src/common/dto/response-paginated.dto';
import { TaskStatus } from '../enums/task-status.enum';

class Assignee {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class PaginatedTask {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  status: TaskStatus;
  @ApiProperty({ type: Assignee, nullable: true })
  assignee: Assignee | null;
}

export class ResponsePaginatedTasksDto extends ResponsePaginatedDto {
  @ApiProperty({ type: PaginatedTask, isArray: true })
  items: PaginatedTask[];
}
