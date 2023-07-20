/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
@Module({
   providers:[UserService,UserRepository],
   controllers:[UserController],
   exports:[UserRepository]
})
export class UserModule {}