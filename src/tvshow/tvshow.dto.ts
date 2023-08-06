/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty,IsUUID,IsInt} from "class-validator";
export class TvshowDto {
    @IsInt()
    @IsNotEmpty()
    tvShowId:number
    @IsString()
    @IsNotEmpty()
    tvShowTitle:string
    @IsString()
    @IsNotEmpty()
    posterId:string
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    userId:string
}