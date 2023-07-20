/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma/prisma.service";
import { Prisma,FavoriteMovie } from "@prisma/client";
@Injectable()
export class MovieRepository{
  constructor(private prisma:PrismaService){}
  async addMovie(
  params:{
    data:Prisma.FavoriteMovieCreateInput
  }):Promise<FavoriteMovie>{
    const { data } = params
    return this.prisma.favoriteMovie.create({
      data
    })
  }
  async getMovie(
  params:{
    where:Prisma.FavoriteMovieWhereInput
  }):Promise<FavoriteMovie>{
   const { where } = params
   return await this.prisma.favoriteMovie.findFirst({
     where
   })
  }
  async deleteMovie(
  params:{
    where:Prisma.FavoriteMovieWhereUniqueInput
  }
  ):Promise<FavoriteMovie>{
    const { where } = params
    return await this.prisma.favoriteMovie.delete({
      where
    })
  }
}