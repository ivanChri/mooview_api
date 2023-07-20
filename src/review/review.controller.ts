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
@Controller('review')
export class ReviewController {
  constructor(private reviewService:ReviewService){}
  @Get(':showId')
  async getReview(@Param('showId') showId:string){
    return await this.reviewService.getReview(showId)
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createReview(@Body() reviewDto:ReviewDto){
    return await this.reviewService.createReview(reviewDto)
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async editReview(
   @Param('id',ParseUUIDPipe) id:string,
   @Body() updateReviewDto:UpdateReviewDto
  ){
    return await this.reviewService.editReview(id,updateReviewDto)
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteReview(@Param('id',ParseUUIDPipe) id:string){
    return await this.reviewService.deleteReview(id)
  }
}