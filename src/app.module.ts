/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './utils/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MovieModule } from './movie/movie.module';
import { TvshowModule } from './tvshow/tvshow.module';
import { ReviewModule } from './review/review.module';
import { HistoryRecordModule } from './utils/history/history.module';
import { PassportAuthModule } from './utils/passport/passportAuth.module';
@Module({
  imports: [
   ThrottlerModule.forRootAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      ttl: config.get('THROTTLE_TTL'),
      limit: config.get('THROTTLE_LIMIT'),
    }),
   }),
   ConfigModule.forRoot({
    isGlobal:true
   }),
   PrismaModule, 
   UserModule,
   ProfileModule,
   MovieModule,
   TvshowModule,
   PassportAuthModule,
   ReviewModule,
   HistoryRecordModule,
   AuthModule
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]

})
export class AppModule {}
