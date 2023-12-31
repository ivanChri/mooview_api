/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
})
export class PassportAuthModule {}