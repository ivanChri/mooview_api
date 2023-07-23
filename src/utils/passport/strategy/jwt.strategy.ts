/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService:ConfigService) {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([
         JwtStrategy.extractJWTFromCookie
        ]),
        ignoreExpiration: false,
        secretOrKey:configService.get(`JWT_CONSTRAINT`)
      });
  }
  private static extractJWTFromCookie(req: Request): string | null {
    if (req.headers.cookie && req.headers.cookie.split("=")[0] === "access_token") {
     return req.headers.cookie.split(`=`)[1]
    }
    return null
  }
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }
  }
}