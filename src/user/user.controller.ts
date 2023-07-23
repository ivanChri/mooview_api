/* eslint-disable prettier/prettier */
import {
  Controller,
  Param,
  Body,
  UseGuards,
  Get,
  Patch,
  ParseUUIDPipe,
  Delete
} from "@nestjs/common";
import { JwtAuthGuard } from "../utils/passport/guard/jwt-auth.guard";
import { UserService } from "./user.service";
import { userUpdateDto } from "./user.dto";
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService:UserService){}
  @Get(':id')
  async getUser(@Param('id',ParseUUIDPipe) id:string){
   return await this.userService.getUser(id)
  }
  @Patch(':id')
  async updateUser(
  @Param('id',ParseUUIDPipe) id:string,
  @Body() UserUpdateDto:userUpdateDto
  ){
    return await this.userService.update(id,UserUpdateDto)
  }
  @Delete(':id')
  async deleteHistory(@Param('id',ParseUUIDPipe) id:string){
    return await this.userService.deleteHistory(id)
  }
}