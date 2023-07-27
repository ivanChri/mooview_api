/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Body,
    Delete,
    Res,
    Req,
    Patch,
    UseGuards,
    Param,
    ParseUUIDPipe
} from '@nestjs/common';
import { authDto } from './auth.dto';
import { JwtAuthGuard } from '../utils/passport/guard/jwt-auth.guard';
import { Response,Request } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
@Controller('auth')
export class AuthController {
   constructor(
    private authService:AuthService,
    private configService:ConfigService 
   ){}
   @Post('register')
   async register(@Body() AuthDto:authDto) {
      return await this.authService.register(AuthDto)
   }
   @Post('login')
   async login(
    @Body() AuthDto:authDto, 
    @Res({ passthrough: true }) res: Response,
    @Req() req:Request
    ){
    const result = await this.authService.login(AuthDto)
    res.set('Access-Control-Allow-Origin',req.headers.origin)
    res.set('Access-Control-Allow-Credentials', 'true');
    res.cookie('access_token',result.token,{
      httpOnly:true,
      domain:this.configService.get("CLIENT_URL"),
      sameSite:"lax"
    })
    delete result.token
    return result
   }
   @Patch('password')
   async changePassword(@Body() AuthDto:authDto){
     return await this.authService.changePassword(AuthDto)
   }
   @UseGuards(JwtAuthGuard)
   @Delete('logout/:id')
   async logout(@Res() res:Response,@Param('id',ParseUUIDPipe) id:string){
    const result = await this.authService.logout(id)
    return res.clearCookie('access_token')
    .status(204)
    .send(result)
    .end()
   }
}
