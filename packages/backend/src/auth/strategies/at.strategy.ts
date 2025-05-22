import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { getConfigOrError } from 'src/common/utils/config.utils';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: getConfigOrError(configService, 'JWT_SECRET'),
		});
	}

	async validate(payload: JwtPayload) {
		return payload;
	}
}
