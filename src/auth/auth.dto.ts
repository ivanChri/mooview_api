/* eslint-disable prettier/prettier */
import { IsEmail,IsString,Length,IsNotEmpty,MaxLength } from "class-validator"
export class authDto {
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  email:string
  @IsString()
  @Length(8)
  @IsNotEmpty()
  password:string
}