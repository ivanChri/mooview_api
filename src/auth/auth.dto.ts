/* eslint-disable prettier/prettier */
import { IsEmail,IsString,Length,IsNotEmpty,MaxLength } from "class-validator"
export class registerDto {
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  email:string
  @IsString()
  @Length(8)
  @IsNotEmpty()
  password:string
  @IsString()
  @IsNotEmpty()
  username:string
}
export class loginDto {
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  email:string
  @IsString()
  @Length(8)
  @IsNotEmpty()
  password:string
}

export class patchDto {
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  email:string
  @IsString()
  @Length(8)
  @IsNotEmpty()
  password:string
  @IsString()
  @IsNotEmpty()
  username:string
}