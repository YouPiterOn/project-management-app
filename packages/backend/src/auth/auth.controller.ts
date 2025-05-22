import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Public()
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@HttpCode(201)
	@ApiCreatedResponse({ type: ResponseAuthDto })
	async signUp(@Body() payload: SignUpDto) {
		return this.authService.signUp(payload);
	}

	@Post('signin')
	@HttpCode(200)
	@ApiOkResponse({ type: ResponseAuthDto })
	async signIn(@Body() payload: SignInDto) {
		return this.authService.signIn(payload);
	}
}
