/* eslint-disable prettier/prettier */
import { Injectable,ForbiddenException,NotFoundException } from '@nestjs/common';
import { hash,verify } from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { authDto } from './auth.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
   private userRepository: UserRepository,
   private jwtService: JwtService
  ){}
  async register(data:authDto){
    try{
      const hashPassword = await hash(data.password)
      await this.userRepository.createUser({
        email: data.email,
        password:hashPassword,
        profile: {
          create:{
            username:data.username,
            about:``,
            avatar:{
              connect:{id:`avatar_1`}
            },
          },
        }
      })
      return {
        message:`user is register`,
      }
    }catch(error){
       if(error instanceof PrismaClientKnownRequestError){
         if(error.code === `P2002`){
            throw new ForbiddenException(`This email is already in use !!`)
         }
       }
      throw error
    }
  }
  async login(data:authDto){
    try {
       const user = await this.userRepository.findUser({
         where:{
           email:{
             equals:data.email
           },
           profile:{
            username:{
              equals:data.username
            }
           }
          },
          include:{
            profile:{
              select:{
                sub:true,
                username:true,
                avatar:{
                  select:{
                    name:true,
                    url:true
                  }
                }
              }
            }
          }
       })
       if(!user) throw new ForbiddenException(`Credentials incorrect`)
       const passwordCompare = await verify(user.password,data.password)
       if(!passwordCompare) throw new ForbiddenException(`Credentials incorrect`)
       const payload = {id:await uuidv4(),sub:user.sub}
       const token = await this.jwtService.signAsync(payload)
       delete user.password
       return {
         message:`login succes`,
         user,
         token,
      }
    } catch (error) {
      throw error
    }
  }
  async logout(id:string){
    try {
      const user = await this.userRepository.findUser({
        where:{
           id:{
            equals:id
           }
        }
      })
      if(!user) throw new ForbiddenException(`Credentials incorrect`)
      return {
        message:`logout success`,
      }
    } catch (error) {
       throw error
    }
  }
  async changePassword(data:authDto){
    try {
      const user = await this.userRepository.findUser({
        where:{
          email:{
            equals:data.email
          },
          profile:{
            username:{
              equals:data.username
            }
          }
        }
      })
      if(!user) throw new NotFoundException(`user is not found`)
      const hashPassword = await hash(data.password)
      await this.userRepository.updateUser({
        where:{
          email:data.email
        },
        data:{
          password:hashPassword
        }
      })
      return {
        message:`password change success`
      }
    } catch (error) {
      throw error
    }
  }
}