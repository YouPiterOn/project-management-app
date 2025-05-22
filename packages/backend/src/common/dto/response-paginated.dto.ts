import { ApiProperty } from "@nestjs/swagger";

export class ResponsePaginatedDto {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  pageSize: number;
}