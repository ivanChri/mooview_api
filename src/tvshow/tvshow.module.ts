/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TvshowRepository } from "./tvshow.repository";
import { TvshowService } from "./tvshow.service";
import { TvshowController } from "./tvshow.controller";
@Module({
  controllers:[TvshowController],
  providers:[TvshowRepository,TvshowService]
})
export class TvshowModule {}