import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { BasePaginationQueryDto } from "src/common/dto/base-pagination-query.dto";

export class ProjectPaginationQueryDto extends BasePaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['title', 'createdAt', 'updatedAt'])
  sortBy?: 'title' | 'createdAt' | 'updatedAt';

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}