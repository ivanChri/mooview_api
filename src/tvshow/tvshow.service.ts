/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,BadRequestException } from "@nestjs/common";
import { TvshowDto } from "./tvshow.dto";
import { TvshowRepository } from "./tvshow.repository";
import { HistoryRecordService } from "../utils/history/history.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
export class TvshowService {
  constructor(
   private tvshowRepository:TvshowRepository,
   private historyRecordService:HistoryRecordService 
  ){}
  async addTvShow(data:TvshowDto){
    try {
      await this.tvshowRepository.addTvShow({
        data:{
          tvShow_id:data.tvShowId,
          tvShow_title:data.tvShowTitle,
          tvShow_poster_id:data.posterId,
          user:{
            connect:{id:data.userId}
          },
        }
      })
      await this.historyRecordService.createShowsHistory({
        userId:data.userId,
        showsId:data.tvShowId,
        showsTitle:data.tvShowTitle,
        activityId:10
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
  async getTvShow(tvshowId:string,userId:string){
    try {
       const tvshow = await this.tvshowRepository.getTvShow({
         where:{
           AND:[
            {
              tvShow_id:tvshowId
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
      await this.historyRecordService.createShowsHistory({
        userId:tvshow.user_id,
        showsId:tvshow.id,
        showsTitle:tvshow.tvShow_title,
        activityId:11
      })
      await this.tvshowRepository.deleteTvShow({
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