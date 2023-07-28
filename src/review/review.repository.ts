/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma/prisma.service";
import { Prisma,Review } from "@prisma/client";
@Injectable()
export class ReviewRepository {
  constructor(private prisma:PrismaService){}
  async createReview(
  params:{
    data:Prisma.ReviewCreateInput
  }):Promise<Review>{
    const { data } = params
    return await this.prisma.review.create({
        data
    })
  }
  async getReview(
  params:{
    where:Prisma.ReviewWhereInput,
    select:Prisma.ReviewSelect
  }):Promise<any[]>{
    const { where,select } = params
    return await this.prisma.review.findMany({
      where,
      select
    })
  }
  async getReviewById(
  params:{
   where:Prisma.ReviewWhereUniqueInput
  }):Promise<Review>{
    const { where } = params
    return await this.prisma.review.findUnique({
      where
    })
  }
  async editReview(
  params:{
   where:Prisma.ReviewWhereUniqueInput,
   data:Prisma.ReviewUpdateInput
  }):Promise<Review>{
    const { where,data } = params
    return await this.prisma.review.update({
      where,
      data
    })
  }
  async deleteReview(
  params:{
   where:Prisma.ReviewWhereUniqueInput
  }):Promise<Review>{
    const { where } = params
    return await this.prisma.review.delete({
      where
    })
  }
}