/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ReviewRepository } from "./review.repository";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
@Module({
  controllers:[ReviewController],
  providers:[ReviewRepository,ReviewService]
})
export class ReviewModule {}