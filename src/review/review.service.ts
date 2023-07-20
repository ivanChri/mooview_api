/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,BadRequestException } from "@nestjs/common";
import { ReviewRepository } from "./review.repository";
import { HistoryRecordService } from "../utils/history/history.service";
import { ReviewDto, UpdateReviewDto } from "./review.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository:ReviewRepository,
    private historyRecordService:HistoryRecordService
  ){}
  async getReview(showId:string){
    try {
       const reviews = await this.reviewRepository.getReview({
          where:{
            shows_id:showId
          },
          include:{
            author:{
              select:{
                profile:{
                  select:{
                    id:true,
                    username:true,
                    avatar:{
                      select:{
                         name:true
                      }
                    }
                  }
                }
              }
            }
          },
       })
       if(!reviews.length) throw new NotFoundException(`no review found for this show`)
       return {
          message: `success get review data`,
          reviews
        }
    } catch (error) {
        throw error
    }
  }
  async createReview(data:ReviewDto){
    try {
      await this.reviewRepository.createReview({
        data:{
          shows_id:data.showId,
          show_title:data.showTitle,
          author:{
            connect:{id:data.userId}
          },
          review:data.review,
        }
      })
      await this.historyRecordService.createReviewHistory({
        userId:data.userId,
        review:data.review,
        activityId:12,
        showsId:data.showId,
        showsTitle:data.showTitle
      })
      return {
        message:`success create review`
      }
    }catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === `P2025`){
          throw new BadRequestException(`user id is invalid`)
        }
      }
      throw error
    }
  }
  async editReview(id:string,data:UpdateReviewDto){
     try {
       const review = await this.reviewRepository.getReviewById({
         where:{
           id
         }
       })
        if(!review) throw new NotFoundException(`review is not found`)
        await this.reviewRepository.editReview({
          where:{
            id
          },
          data:{
            review:data.review
          }
        })
        await this.historyRecordService.createReviewHistory({
          userId:review.author_id,
          reviewId:review.id,
          review:review.review,
          activityId:13,
          showsId:review.shows_id,
          showsTitle:review.show_title
        })
        return {
          message:`update success`
        }
     } catch (error) {
        throw error
     }
  }
  async deleteReview(id:string){
    try {
       const review = await this.reviewRepository.getReviewById({
         where:{
           id
         }
       })
       if(!review) throw new NotFoundException(`review not found`)
       await this.historyRecordService.createReviewHistory({
         userId:review.author_id,
         reviewId:review.id,
         review:review.review,
         activityId:14,
         showsId:review.shows_id,
         showsTitle:review.show_title
       })
       await this.reviewRepository.deleteReview({
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