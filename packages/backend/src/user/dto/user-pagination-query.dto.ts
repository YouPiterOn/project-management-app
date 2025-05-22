import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { BasePaginationQueryDto } from "src/common/dto/base-pagination-query.dto";

export class UserPaginationQueryDto extends BasePaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['email', 'name', 'role'])
  sortBy?: 'email' | 'name' | 'role';

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}