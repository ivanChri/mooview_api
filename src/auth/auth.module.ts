/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
@Module({
imports:[
 ConfigModule,
 UserModule,
 JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
  secret:configService.get("JWT_CONSTRAINT"),
 }),
  inject: [ConfigService],
 }),
],
providers:[AuthService],
controllers:[AuthController]
})
export class AuthModule {}