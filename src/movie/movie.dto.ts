/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty,IsUUID,IsInt } from "class-validator";
export class MovieDto {
  @IsInt()
  @IsNotEmpty()
  movieId:number
  @IsString()
  @IsNotEmpty()
  movieTitle:string
  @IsString()
  @IsNotEmpty()
  posterId:string
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId:string
}