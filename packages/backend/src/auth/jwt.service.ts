import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/common/enums/role.enum';
import { getConfigOrError } from 'src/utils/config.utils';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class JwtService {
	constructor(
		private nestJwtService: NestJwtService,
		configService: ConfigService,
	) {
		this.secret = getConfigOrError(configService, 'JWT_SECRET');
		this.expiresIn = getConfigOrError(configService, 'JWT_EXPIRES_IN');
	}

	private secret: string;
	private expiresIn: string;

	async sign(userId: string, email: string, role: Role) {
		const payload: JwtPayload = { sub: userId, email, role };

		const token = await this.nestJwtService.signAsync(payload, {
			secret: this.secret,
			expiresIn: this.expiresIn,
		});

		return token;
	}

	async verify(token: string) {
		const payload = await this.nestJwtService.verifyAsync(token, {
			secret: this.secret,
		});

		return {
			userId: payload.sub,
			email: payload.email,
			role: payload.role,
		};
	}
}
