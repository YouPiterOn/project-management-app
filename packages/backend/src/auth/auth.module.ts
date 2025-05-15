import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [ConfigModule, JwtModule.register({}), UserModule],
	controllers: [AuthController],
	providers: [AuthService, JwtService],
})
export class AuthModule {}
