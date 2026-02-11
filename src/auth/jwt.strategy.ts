import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // reads "Authorization: Bearer <token>"
      ignoreExpiration: false,
      secretOrKey: 'supersecretkey', // MUST match AuthModule secret
    });
  }

  async validate(payload: any) {
    // This becomes req.user
    return {
      userId: payload.userId,
      role: payload.role,
      country: payload.country,
    };
  }
}
