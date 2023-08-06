/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,BadRequestException } from "@nestjs/common";
import { TvshowDto } from "./tvshow.dto";
import { TvshowRepository } from "./tvshow.repository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
export class TvshowService {
  constructor(
   private tvshowRepository:TvshowRepository,
  ){}
  async addTvShow(data:TvshowDto){
    try {
      await this.tvshowRepository.addTvShow({
        data:{
          tv_id:data.tvShowId,
          title:data.tvShowTitle,
          poster_path:data.posterId,
          user:{
            connect:{id:data.userId}
          },
        }
      })
      return {
        message:`tvshow successfully added`
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
  async getTvShow(tvshowId:number,userId:string){
    try {
       const tvshow = await this.tvshowRepository.getTvShow({
         where:{
           AND:[
            {
              tv_id:tvshowId
            },
            {
              user_id:userId
            }
           ]
         }
       })
       if(!tvshow) throw new NotFoundException(`tvshow is not found`)
       return {
         message:`success get tvshow data`,
         tvshow
       }
    } catch (error) {
       throw error
    }
  }
  async deleteTvShow(id:string){
    try {
      const tvshow = await this.tvshowRepository.getTvShow({
        where:{
          id
        }
      })
      if(!tvshow) throw new NotFoundException(`tvshow is not found`)
      await this.tvshowRepository.deleteTvShow({
        where:{
          id
        }
      })
      return {
        message:`delete success`,
        tvshow
      }
    } catch (error) {
        throw error
    }
  }
}