/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,BadRequestException } from "@nestjs/common";
import { MovieRepository } from "./movie.repository";
import { MovieDto } from "./movie.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
export class MovieService {
  constructor(
    private movieRepository:MovieRepository,
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
                movie_id:{
                  equals:movieId
                }
              },
              {
                user_id:{
                  equals:userId
                }
              },
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
        await this.movieRepository.deleteMovie({
          where:{
            id
          }
        })
        return {
          message:`delete success`,
          movie
        }
    } catch (error) {
        throw error
    }
  }
}