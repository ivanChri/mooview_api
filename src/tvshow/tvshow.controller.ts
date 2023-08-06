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
 ParseUUIDPipe,
 BadRequestException
} from "@nestjs/common";
import { JwtAuthGuard } from "../utils/passport/guard/jwt-auth.guard";
import { TvshowService } from "./tvshow.service";
import { TvshowDto } from "./tvshow.dto";
import { HistoryRecordService } from "../utils/history/history.service";
@UseGuards(JwtAuthGuard)
@Controller('tvshow')
export class TvshowController {
  constructor(
   private tvshowService:TvshowService,
   private historyRecordService:HistoryRecordService   
  ){}
  @Get()
  async getTvShow(
    @Query('tvshowId') tvshowId:number,
    @Query('userId',ParseUUIDPipe) userId:string
  ){
    if(!tvshowId) throw new BadRequestException(`tvshow id must not empty`)
    return await this.tvshowService.getTvShow(tvshowId,userId)
  }
  @Post()
  async addTvShow(@Body() tvshowDto:TvshowDto){
    const result = await this.tvshowService.addTvShow(tvshowDto)
    await this.historyRecordService.createShowsHistory({
      userId:tvshowDto.userId,
      showsId:tvshowDto.tvShowId,
      showsTitle:tvshowDto.tvShowTitle,
      activityId:10
    })
    return result
  }
  @Delete(':id')
  async deleteTvShow(@Param('id',ParseUUIDPipe) id:string){
    const result = await this.tvshowService.deleteTvShow(id)
    await this.historyRecordService.createShowsHistory({
      userId:result.tvshow.user_id,
      showsId:result.tvshow.tv_id,
      showsTitle:result.tvshow.title,
      activityId:11
    })
    delete result.tvshow
    return result
  }
}