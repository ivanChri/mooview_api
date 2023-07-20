/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { Prisma,User } from '@prisma/client';
@Injectable()
export class UserRepository {
 constructor(private prisma : PrismaService){}
  async createUser(data:Prisma.UserCreateInput):Promise<User> {
   return await this.prisma.user.create({
    data
   })
  }
  async findUser(
    params:{
        where:Prisma.UserWhereUniqueInput,
        include?:Prisma.UserInclude
    }
  ):Promise<User> {
    const {where,include} = params
    return await this.prisma.user.findUnique({
        where,
        include
    })
  }
  async updateUser (
     params:{
        where:Prisma.UserWhereUniqueInput,
        data:Prisma.UserUpdateInput
     }
    ):Promise<User> {
        const { data, where } = params;
        return await this.prisma.user.update({
            where,
            data
        })
    }
}
