/* eslint-disable prettier/prettier */
import { Test,TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { HistoryRecordService } from "../utils/history/history.service";
import { PrismaService } from "../utils/prisma/prisma.service";
import { HistoryRecordRepository } from "../utils/history/history.repository";
import { ForbiddenException } from "@nestjs/common";
describe("user service",() => {
  let userService:UserService
  beforeEach(async () => {
   const module:TestingModule = await Test.createTestingModule({
    providers:[
      UserService,
      UserRepository,
      HistoryRecordService,
      PrismaService,
      HistoryRecordRepository
    ]
   }).compile()
   userService = module.get<UserService>(UserService)
 })
  it("should be define",() => {
    expect(userService).toBeDefined()
  })
  it("should able to get user data",async () => {
    const getUser = await userService.getUser(process.env.USER_ID)
    expect(getUser.user).toBeDefined()
  })
  it("should able to delete history record",async () => {
    const deleteHistory = await userService.deleteHistory(process.env.USER_ID)
    expect(deleteHistory.message).toBeDefined()
  })
  it("should able to edit user email and password",async () => {
    const updateUser = await userService.update(process.env.USER_ID,{
      email:"test@gmail.com",
      password:"test password",
      newEmail:"newEmail@gmail.com",
      newPassword:"my new password"
    })
    expect(updateUser.message).toBeDefined()
  })
  it("should not able to update user email and password if given email is not valid",async () => {
    const updateUser = userService.update(process.env.USER_ID,{
      email:"false@gmail.com",
      password:"my new password",
      newEmail:"updateEmail@gmail.com",
      newPassword:"update password"
    })
    await expect(updateUser).rejects.toBeInstanceOf(ForbiddenException)
  })
  it("should not able to update user email and password if given password is not valid",async () => {
    const updateUser = userService.update(process.env.USER_ID,{
      email:"newEmail@gmail.com",
      password:"false password",
      newEmail:"updateEmail@gmail.com",
      newPassword:"update password"
    })
    await expect(updateUser).rejects.toBeInstanceOf(ForbiddenException)
  })
  it("should not able to get user data if user id is not found",async () => {
    const getUser = userService.getUser("a83d9a19-b459-454d-9d1c-4b78509f6d88")
    await expect(getUser).rejects.toBeInstanceOf(ForbiddenException)
  })
  it("should not able to delete history record if user id is not valid",async () => {
    const deleteHistory = userService.deleteHistory("false user id")
    await expect(deleteHistory).rejects.toBeInstanceOf(ForbiddenException)
  })
})