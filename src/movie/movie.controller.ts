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
  ParseUUIDPipe
} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { JwtAuthGuard } from "../utils/passport/guard/jwt-auth.guard";
import { MovieDto } from "./movie.dto";
@UseGuards(JwtAuthGuard)
@Controller('movie')
export class MovieController {
  constructor(private movieService:MovieService){}
  @Get()
  async getMovie(
   @Query('movieId') movieId:string,
   @Query('userId',ParseUUIDPipe) userId:string
  ){
    return await this.movieService.getMovie(movieId,userId)
  }
  @Post()
  async addMovie(@Body() movieDto:MovieDto){
    return await this.movieService.addMovie(movieDto)
  }
  @Delete(':id')
  async deleteMovie(@Param('id',ParseUUIDPipe) id:string){
    return await this.movieService.deleteMovie(id)
  }
}