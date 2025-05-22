import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class ProjectFiltersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  ownerId?: string;
}
