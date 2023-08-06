/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { HistoryRecordRepository } from "./history.repository";
import { Prisma } from "@prisma/client";
@Injectable()
export class HistoryRecordService {
 constructor(private historyRecordRepository:HistoryRecordRepository){}
  async createShowsHistory(
   data:{
    userId:string,
    showsId:number,
    showsTitle:string,
    activityId:number
  }){
    try {
        const {userId,showsId,showsTitle,activityId} = data
        const jsonData = {
         id:showsId,
         title:showsTitle
        } as  Prisma.JsonObject
        return await this.historyRecordRepository.createHistory({
         data:{
           activity:{
             connect:{id:activityId}
           },
           user:{
             connect:{id:userId}
           },
           detail:jsonData
         }
        })
    } catch (error) {
        throw error
    }
  }
  async createReviewHistory(
  data:{
    userId:string,
    reviewId?:string,
    review:string,
    activityId:number,
    showsId:string,
    showsTitle:string
  }){
    try {
    const {userId,reviewId,review,activityId,showsId,showsTitle } = data
      const jsonData = {
        id:reviewId,
        showsId,
        showsTitle,
        review
      } as Prisma.JsonObject
      return await this.historyRecordRepository.createHistory({
        data:{
          activity:{
            connect:{id:activityId}
          },
          user:{
            connect:{id:userId}
          },
          detail:jsonData
        }
      })
    } catch (error) {
       throw error
    }
  }
  async deleteHistoryRecord(id:string){
   try {
    return await this.historyRecordRepository.deleteHistory({
      where:{
        user_id:{
           equals:id
        }
      }
    }) 
   } catch (error) {
    throw error
   }
  }
}