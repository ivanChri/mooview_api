/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { hash,verify } from 'argon2';
import { UserRepository } from './user.repository';
import { userUpdateDto } from './user.dto';
import { HistoryRecordService } from '../utils/history/history.service';
@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private historyRecordService: HistoryRecordService
  ) {}
  async getUser(id:string){
    try {
    const user = await this.userRepository.findUser({
       where:{
         id
       },
       include:{
        favoriteMovie:{
          select:{
            id:true,
            movie_id:true,
            title:true,
            poster_path:true
          }
        },
        favoriteTvShow:{
          select:{
            id:true,
            tv_id:true,
            title:true,
            poster_path:true
          }
        },
        review:{
          select:{
            id:true,
            created_at:true,
            show_title:true,
            shows_id:true,
            review:true,
            author_id:true
          }
        },
        historyRecord:{
          include:{
            activity:{
              select:{
                name:true
              }
            }
          }
        }
       }
      })
      if(!user) throw new ForbiddenException(`Credentials is not valid`)
      delete user.password
      return {
        user
      }
    } catch (error) {
     throw error
  }
 }
  async update(id:string,data:userUpdateDto){
    try {
      const user = await this.userRepository.findUser({
        where:{
          email:data.email,
          profile:{
            username:{
              equals:data.username
            }
          }
        }      
      })
      if(!user) throw new ForbiddenException(`Credentials incorrect`)
      const passwordCompare = await verify(user.password,data.password)
      if(!passwordCompare) throw new ForbiddenException(`Credentials incorrect`)
      const updatedData : {email?:string,password?:string} = {}
      if(data.newEmail){
        updatedData.email = data.newEmail
      }
      if(data.newPassword){
        updatedData.password = await hash(data.newPassword)
      }
      await this.userRepository.updateUser({
        where:{
          id
        },
        data:updatedData,
      })
      return {
        message:`update success`,
      }
    } catch (error) {
       throw error
    }
  }
  async deleteHistory(id:string){
    try {
      const user = await this.userRepository.findUser({
        where:{
          id
        }
      })
      if(!user) throw new ForbiddenException(`Credentials incorrect`)
      await this.historyRecordService.deleteHistoryRecord(id)
      return {
        message:`history record deleted`
      }
    } catch (error) {
      throw error
    }
  }
}
