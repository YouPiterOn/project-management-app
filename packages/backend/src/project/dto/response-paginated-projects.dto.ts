import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatedDto } from 'src/common/dto/response-paginated.dto';

class Owner {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

class PaginatedProject {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: Owner })
  owner: Owner;
}

export class ResponsePaginatedProjectsDto extends ResponsePaginatedDto {
  @ApiProperty({ type: PaginatedProject, isArray: true })
  items: PaginatedProject[];
}
