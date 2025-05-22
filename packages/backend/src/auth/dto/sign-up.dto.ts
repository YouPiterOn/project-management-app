import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/common/decorators/is-password.decorator';

export class SignUpDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsPassword()
	@IsNotEmpty()
	password: string;
}
