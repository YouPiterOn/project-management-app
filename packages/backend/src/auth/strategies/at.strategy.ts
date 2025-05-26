import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { getConfigOrError } from 'src/common/utils/config.utils';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.['access_token'];
        },
      ]),
      secretOrKey: getConfigOrError(configService, 'JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
