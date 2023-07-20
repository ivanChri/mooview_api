/* eslint-disable prettier/prettier */
import { IsString,MaxLength,IsNotEmpty,IsUUID } from "class-validator";
export class ReviewDto {
   @IsString()
   @IsNotEmpty()
   showId:string
   @IsString()
   @IsUUID()
   @IsNotEmpty()
   userId:string
   @IsString()
   @IsNotEmpty()
   showTitle:string
   @IsString()
   @IsNotEmpty()
   @MaxLength(1000)
   review:string
}
export class UpdateReviewDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  review:string
}