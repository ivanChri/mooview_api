/* eslint-disable prettier/prettier */
import { 
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  BadRequestException
} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { HistoryRecordService } from "../utils/history/history.service";
import { JwtAuthGuard } from "../utils/passport/guard/jwt-auth.guard";
import { MovieDto } from "./movie.dto";
@UseGuards(JwtAuthGuard)
@Controller('movie')
export class MovieController {
  constructor(
    private movieService:MovieService,
    private historyRecordService:HistoryRecordService
  ){}
  @Get()
  async getMovie(
   @Query('movieId') movieId:number,
   @Query('userId',ParseUUIDPipe) userId:string
  ){
    if(!movieId) throw new BadRequestException("movieId is must not empty")
    return await this.movieService.getMovie(movieId,userId)
  }
  @Post()
  async addMovie(@Body() movieDto:MovieDto){
    const result = await this.movieService.addMovie(movieDto)
    await this.historyRecordService.createShowsHistory({
      userId:movieDto.userId,
      showsId:movieDto.movieId,
      showsTitle:movieDto.movieTitle,
      activityId:8
    })
    return result
  }
  @Delete(':id')
  async deleteMovie(@Param('id',ParseUUIDPipe) id:string){
    const result = await this.movieService.deleteMovie(id)
    await this.historyRecordService.createShowsHistory({
      userId:result.movie.user_id,
      showsId:result.movie.movie_id,
      showsTitle:result.movie.title,
      activityId:9
    })
    delete result.movie
    return result
  }
}