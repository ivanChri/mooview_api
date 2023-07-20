/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProfileRepository } from "./profile.repository";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
@Module({
  controllers:[ProfileController],
  providers:[ProfileRepository,ProfileService]
})
export class ProfileModule{}