import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signUp(@Body() payload: SignUpDto) {
		return this.authService.signUp(payload);
	}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	async signIn(@Body() payload: SignInDto) {
		return this.authService.signIn(payload);
	}
}
