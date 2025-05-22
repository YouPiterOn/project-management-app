import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { IsPassword } from "src/common/decorators/is-password.decorator";

export class UserPatchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPassword()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}