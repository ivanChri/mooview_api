/* eslint-disable prettier/prettier */
import { 
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  ParseUUIDPipe 
} from "@nestjs/common";
import { JwtAuthGuard } from "../utils/passport/guard/jwt-auth.guard";
import { ProfileService } from "./profile.service";
import { ProfileUpdateDto } from "./profile.dto";
@Controller('profile')
export class ProfileController{
  constructor(private profileService:ProfileService){}
  @Get(':sub')
  async getProfile(@Param('sub',ParseUUIDPipe) sub:string){
    return await this.profileService.getProfile(sub)
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async editProfile(
   @Param('id',ParseUUIDPipe) id:string,
   @Body() profileUpdateDto:ProfileUpdateDto
  ){
    return await this.profileService.editProfile(id,profileUpdateDto)
  }
}

