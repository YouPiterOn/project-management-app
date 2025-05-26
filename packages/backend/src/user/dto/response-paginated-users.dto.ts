import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatedDto } from 'src/common/dto/response-paginated.dto';

class PaginatedUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  role: string;
}

export class ResponsePaginatedUsersDto extends ResponsePaginatedDto {
  @ApiProperty({ type: PaginatedUser, isArray: true })
  items: PaginatedUser[];
}
