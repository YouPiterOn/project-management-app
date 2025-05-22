import { ApiProperty } from "@nestjs/swagger";
import { ResponsePaginatedDto } from "src/common/dto/response-paginated.dto";
import { TaskStatus } from "../enums/task-status.enum";

class PaginatedTask {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
  assigneeId?: string;
  @ApiProperty()
  status: TaskStatus;
}

export class ResponsePaginatedTasksDto extends ResponsePaginatedDto {
  @ApiProperty({ type: PaginatedTask, isArray: true })
  items: PaginatedTask[]
}