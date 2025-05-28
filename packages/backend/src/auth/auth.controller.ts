import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(201)
  @ApiCreatedResponse({ type: ResponseAuthDto })
  async signUp(@Body() payload: SignUpDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, user } = await this.authService.signUp(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
    });

    return user as ResponseAuthDto;
  }

  @Post('signin')
  @Public()
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseAuthDto })
  async signIn(@Body() payload: SignInDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, user } = await this.authService.signIn(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
    });

    return user as ResponseAuthDto;
  }

  @Post('signout')
  @Public()
  @HttpCode(200)
  @ApiOkResponse()
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // expire immediately
    });

    return { message: 'Signed out successfully' };
  }
}
