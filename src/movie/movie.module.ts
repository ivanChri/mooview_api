/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MovieRepository } from "./movie.repository";
import { MovieService } from "./movie.service";
import { MovieController } from "./movie.controller";
@Module({
  controllers:[MovieController],
  providers:[
    MovieRepository,
    MovieService,
  ]
})
export class MovieModule {}