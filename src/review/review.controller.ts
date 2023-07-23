/* eslint-disable prettier/prettier */
import { 
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  ParseUUIDPipe
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewDto, UpdateReviewDto } from "./review.dto";
import { JwtAuthGuard } from "../utils/passport/guard/jwt-auth.guard";
import { HistoryRecordService } from "../utils/history/history.service";
@Controller('review')
export class ReviewController {
  constructor(
    private reviewService:ReviewService,
    private historyRecordService:HistoryRecordService
  ){}
  @Get(':showId')
  async getReview(@Param('showId') showId:string){
    return await this.reviewService.getReview(showId)
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createReview(@Body() reviewDto:ReviewDto){
    const result = await this.reviewService.createReview(reviewDto)
    await this.historyRecordService.createReviewHistory({
      userId:reviewDto.userId,
      review:reviewDto.review,
      activityId:12,
      showsId:reviewDto.showId,
      showsTitle:reviewDto.showTitle
    })
    return result
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async editReview(
   @Param('id',ParseUUIDPipe) id:string,
   @Body() updateReviewDto:UpdateReviewDto
  ){
   const result = await this.reviewService.editReview(id,updateReviewDto)
   await this.historyRecordService.createReviewHistory({
    userId:result.review.author_id,
    reviewId:result.review.id,
    review:updateReviewDto.review,
    activityId:13,
    showsId:result.review.shows_id,
    showsTitle:result.review.show_title
  })
   delete result.review
   return result
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteReview(@Param('id',ParseUUIDPipe) id:string){
    const result = await this.reviewService.deleteReview(id)
    await this.historyRecordService.createReviewHistory({
      userId:result.review.author_id,
      reviewId:result.review.id,
      review:result.review.review,
      activityId:14,
      showsId:result.review.shows_id,
      showsTitle:result.review.show_title
    })
    delete result.review
    return result
  }
}