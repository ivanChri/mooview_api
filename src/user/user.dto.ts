/* eslint-disable prettier/prettier */
import { IsEmail,IsOptional,IsString, Length,IsNotEmpty} from "class-validator"
export class userUpdateDto {
   @IsString()
   @Length(8)
   @IsOptional()
   newPassword:string
   @IsEmail()
   @IsOptional()
   newEmail:string
   @IsString()
   @Length(8)
   @IsNotEmpty()
   password:string
   @IsEmail()
   @IsNotEmpty()
   email:string
}