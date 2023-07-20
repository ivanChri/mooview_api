/* eslint-disable prettier/prettier */
import {
 Controller,
 Get,
 Query,
 Post,
 Body,
 Delete,
 Param,
 UseGuards,
 ParseUUIDPipe
} from "@nestjs/common";
import { JwtAuthGuard } from "src/utils/passport/guard/jwt-auth.guard";
import { TvshowService } from "./tvshow.service";
import { TvshowDto } from "./tvshow.dto";
@UseGuards(JwtAuthGuard)
@Controller('tvshow')
export class TvshowController {
  constructor(private tvshowService:TvshowService){}
  @Get()
  async getTvShow(
    @Query('tvshowId') tvshowId:string,
    @Query('userId',ParseUUIDPipe) userId:string
  ){
    return await this.tvshowService.getTvShow(tvshowId,userId)
  }
  @Post()
  async addTvShow(@Body() tvshowDto:TvshowDto){
    return await this.tvshowService.addTvShow(tvshowDto)
  }
  @Delete(':id')
  async deleteTvShow(@Param('id',ParseUUIDPipe) id:string){
    return await this.tvshowService.deleteTvShow(id)
  }
}