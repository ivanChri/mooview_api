/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Body,
    Delete,
    Res,
    Patch,
    UseGuards,
    Param,
    ParseUUIDPipe
} from '@nestjs/common';
import { authDto } from './auth.dto';
import { JwtAuthGuard } from '../utils/passport/guard/jwt-auth.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
   constructor(private authService:AuthService){}
   @Post('register')
   async register(@Body() AuthDto:authDto) {
      return await this.authService.register(AuthDto)
   }
   @Post('login')
   async login(
    @Body() AuthDto:authDto, 
    @Res({ passthrough: true }) res: Response)
    {
    const result = await this.authService.login(AuthDto)
    res.cookie('access_token',result.token,{
      httpOnly:true,
      sameSite:'lax',
    })
    delete result.token
    return result
   }
   @Patch('forget-password')
   async changePassword(@Body() AuthDto:authDto){
     return await this.authService.changePassword(AuthDto)
   }
   @UseGuards(JwtAuthGuard)
   @Delete('logout/:id')
   async logout(@Res() res:Response,@Param('id',ParseUUIDPipe) id:string){
    const result = await this.authService.logout(id)
    return res.clearCookie('access_token')
    .status(204)
    .send({result})
    .end()
   }
}
