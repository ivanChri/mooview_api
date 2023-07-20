/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma,HistoryRecord } from "@prisma/client";
@Injectable()
export class HistoryRecordRepository {
  constructor(private prisma:PrismaService){}
  async createHistory(
  params:{
   data:Prisma.HistoryRecordCreateInput
  }):Promise<HistoryRecord>{
    const { data } = params
    return await this.prisma.historyRecord.create({
      data
    })
  }
  async deleteHistory(
  params:{
   where:Prisma.HistoryRecordWhereInput
  }):Promise<any>{
    const { where } = params
    return await this.prisma.historyRecord.deleteMany({
        where
    })
  }
}