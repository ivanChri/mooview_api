/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,BadRequestException } from "@nestjs/common";
import { ReviewRepository } from "./review.repository";
import { ReviewDto, UpdateReviewDto } from "./review.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository:ReviewRepository,
  ){}
  async getReview(showId:string){
    try {
       const reviews = await this.reviewRepository.getReview({
        where: {
          shows_id: showId
        },
        select: {
          created_at:true,
          review:true,
          author:{
            select:{
              profile:{
                select:{
                  username:true,
                  sub:true,
                  avatar:{
                    select:{
                      name:true,
                      url:true
                    }
                  }
                }
              }
            }
          } 
        }
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
        return {
          message:`update success`,
          review
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
       await this.reviewRepository.deleteReview({
        where:{
           id
        }
       })
       return {
         message:`delete success`,
         review
       }
    } catch (error) {
        throw error
    }
  }
}