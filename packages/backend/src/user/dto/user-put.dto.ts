import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/common/decorators/is-password.decorator';

export class UserPutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPassword()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
