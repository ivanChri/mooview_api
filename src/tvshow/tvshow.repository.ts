/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma/prisma.service";
import { Prisma,FavoriteTvShow } from "@prisma/client";
@Injectable()
export class TvshowRepository {
  constructor(private prisma:PrismaService){}
  async addTvShow(
  params:{
    data:Prisma.FavoriteTvShowCreateInput
  }):Promise<FavoriteTvShow>{
    const { data } = params
    return await this.prisma.favoriteTvShow.create({
      data
    })
  }
  async getTvShow(
  params:{
    where:Prisma.FavoriteTvShowWhereInput
  }):Promise<FavoriteTvShow>{
    const { where } = params
    return await this.prisma.favoriteTvShow.findFirst({
      where
    })
  }
  async deleteTvShow(
  params:{
   where:Prisma.FavoriteTvShowWhereUniqueInput  
  }):Promise<FavoriteTvShow>{
    const { where } = params
    return await this.prisma.favoriteTvShow.delete({
      where
    })
  }
}