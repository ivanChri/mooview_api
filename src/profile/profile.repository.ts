/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma/prisma.service";
import { Prisma,Profile } from "@prisma/client";
@Injectable()
export class ProfileRepository{
 constructor(private prisma:PrismaService){}
 async getProfile(
  params:{
    where:Prisma.ProfileWhereUniqueInput,
    include:Prisma.ProfileInclude
  }):Promise<Profile>{
   const { where,include } = params
   return await this.prisma.profile.findUnique({
     where,
     include
   })
 }
 async updateProfile(
  params:{
    where:Prisma.ProfileWhereUniqueInput,
    data:Prisma.ProfileUpdateInput
  }
 ):Promise<Profile>{
  const { where,data } = params
  return await this.prisma.profile.update({
    where,
    data
  })
 }
}