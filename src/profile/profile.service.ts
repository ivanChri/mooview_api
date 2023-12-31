/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException,ForbiddenException} from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { ProfileUpdateDto } from "./profile.dto";
@Injectable()
export class ProfileService {
  constructor(private profileRepository:ProfileRepository){}
  async getProfile(sub:string){
    try {
     const profile =  await this.profileRepository.getProfile({
      where:{
        sub
      },
      include:{
        user:{
          select:{
            favoriteMovie:{
              select:{
                title:true,
                movie_id:true,
                poster_path:true
              }
            },
            favoriteTvShow:{
              select:{
                title:true,
                tv_id:true,
                poster_path:true,
              }
            },
            review:{
              select:{
                show_title:true,
                shows_id:true,
                created_at:true,
                review:true
              }
            }
          }
        },
        avatar:{
          select:{
            name:true,
            url:true
          }
        }
      }
     })
     if(!profile) throw new NotFoundException(`profile is not found`)
     return {
       message:`success get profile data`,
       profile
     }
    } catch (error) {
        throw error
    }
  }
  async editProfile(id:string,data:ProfileUpdateDto){
    try {
     const profile = await this.profileRepository.getProfile({
       where:{
         id
       }
     })
     if(!profile) throw new ForbiddenException(`Credentials is not valid`)
     const updatedData:{
        username?:string,
        avatarId?:string,
        about?:string
     } = {}
     if(data.username){
       updatedData.username = data.username
     }
     if(data.avatarId){
       updatedData.avatarId = data.avatarId
     }
     if(data.about){
        updatedData.about = data.about
     }
     await this.profileRepository.updateProfile({
        where:{
          id
        },
        data:updatedData
     })
     return {
        message:`update success`
     }
    } catch (error) {
        throw error
    }
  }
}