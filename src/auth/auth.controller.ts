/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Body,
    Delete,
    Patch,
    UseGuards,
    Param,
    ParseUUIDPipe
} from '@nestjs/common';
import { authDto } from './auth.dto';
import { JwtAuthGuard } from '../utils/passport/guard/jwt-auth.guard';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
   constructor(private authService:AuthService){}
   @Post('register')
   async register(@Body() AuthDto:authDto) {
      return await this.authService.register(AuthDto)
   }
   @Post('login')
   async login(@Body() AuthDto:authDto){
    return await this.authService.login(AuthDto)
   }
   @Patch('password')
   async changePassword(@Body() AuthDto:authDto){
     return await this.authService.changePassword(AuthDto)
   }
   @UseGuards(JwtAuthGuard)
   @Delete('logout/:id')
   async logout(@Param('id',ParseUUIDPipe) id:string){
     return await this.authService.logout(id)
   }
}
