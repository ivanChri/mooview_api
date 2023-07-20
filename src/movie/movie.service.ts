/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,BadRequestException } from "@nestjs/common";
import { MovieRepository } from "./movie.repository";
import { MovieDto } from "./movie.dto";
import { HistoryRecordService } from "../utils/history/history.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
export class MovieService {
  constructor(
    private movieRepository:MovieRepository,
    private historyRecordService:HistoryRecordService
  ){}
  async addMovie(data:MovieDto){
    try {
      await this.movieRepository.addMovie({
        data:{
          movie_id:data.movieId,
          movie_poster_id:data.posterId,
          movie_title:data.movieTitle,
          user:{
            connect:{id:data.userId}
          }
        }
      })
      await this.historyRecordService.createShowsHistory({
        userId:data.userId,
        showsId:data.movieId,
        showsTitle:data.movieTitle,
        activityId:8
      })
      return {
        message:`movie successfully added`
      }
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === `P2025`){
          throw new BadRequestException(`user id is invalid`)
        }
      }
      throw error
    }
  }
  async getMovie(movieId:string,userId:string){
    try {
      const movie = await this.movieRepository.getMovie({
        where:{
            AND:[
              {
                movie_id:movieId
              },
              {
                user_id:userId
              }
            ]
        }
      })
      if(!movie) throw new NotFoundException(`movie is not found`)
       return {
         message:`success get movie data`,
         movie
       }
    } catch (error) {
      throw error
    }
  }
  async deleteMovie(id:string){
    try {
        const movie = await this.movieRepository.getMovie({
          where:{
            id
          }
        })
        if(!movie) throw new NotFoundException(`movie is not found`)
        await this.historyRecordService.createShowsHistory({
          userId:movie.user_id,
          showsId:movie.id,
          showsTitle:movie.movie_title,
          activityId:9
        })
        await this.movieRepository.deleteMovie({
          where:{
            id
          }
        })
        return {
            message:`delete success`
        }
    } catch (error) {
        throw error
    }
  }
}