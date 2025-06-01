import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserFiltersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;
}
