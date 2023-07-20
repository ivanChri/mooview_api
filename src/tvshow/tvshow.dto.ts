/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty,IsUUID} from "class-validator";
export class TvshowDto {
    @IsString()
    @IsNotEmpty()
    tvShowId:string
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