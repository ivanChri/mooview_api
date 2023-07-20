/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty,IsUUID } from "class-validator";
export class MovieDto {
  @IsString()
  @IsNotEmpty()
  movieId:string
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