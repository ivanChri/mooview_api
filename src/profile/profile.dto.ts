/* eslint-disable prettier/prettier */
import { IsOptional,IsString,MaxLength } from "class-validator";
export class ProfileUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  username:string
  @IsOptional()
  @IsString()
  avatarId:string
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  about:string
}