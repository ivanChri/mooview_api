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
import { registerDto,loginDto,patchDto} from './auth.dto';
import { JwtAuthGuard } from '../utils/passport/guard/jwt-auth.guard';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
   constructor(private authService:AuthService){}
   @Post('register')
   async register(@Body() RegisterDto:registerDto) {
      return await this.authService.register(RegisterDto)
   }
   @Post('login')
   async login(@Body() LoginDto:loginDto){
    return await this.authService.login(LoginDto)
   }
   @Patch('password')
   async changePassword(@Body() PatchDto:patchDto){
     return await this.authService.changePassword(PatchDto)
   }
   @UseGuards(JwtAuthGuard)
   @Delete('logout/:id')
   async logout(@Param('id',ParseUUIDPipe) id:string){
     return await this.authService.logout(id)
   }
}
