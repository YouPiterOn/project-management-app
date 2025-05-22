import { ApiProperty } from "@nestjs/swagger";
import { ResponsePaginatedDto } from "src/common/dto/response-paginated.dto";

class PaginatedProject {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  ownerId: string;
}

export class ResponsePaginatedProjectsDto extends ResponsePaginatedDto {
  @ApiProperty({ type: PaginatedProject, isArray: true })
  items: PaginatedProject[]
}