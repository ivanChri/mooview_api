/* eslint-disable prettier/prettier */
import { Test,TestingModule } from "@nestjs/testing";
import { UserRepository } from "../user/user.repository";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../utils/prisma/prisma.service";
import { ForbiddenException,NotFoundException } from "@nestjs/common";
describe("auth service",() => {
 let authService:AuthService
 beforeEach(async () => {
   const module:TestingModule = await Test.createTestingModule({
    providers:[
     AuthService,
     JwtService,
     UserRepository,
     PrismaService
    ]
   }).compile()
   authService = module.get<AuthService>(AuthService)
 })
  it("should be define",() => {
    expect(authService).toBeDefined()
  })
  it("should able register new user",async () => {
    const register = authService.register({
      email:"test@gmail.com",
      password:"test password"
    })
    await expect(register).resolves.toStrictEqual({message:"user is register"})
  })
  it("should able to login",async () => {
    const login = await authService.login({
     email:"test@gmail.com",
     password:"test password"
    })
    expect(login.message).toBeDefined()
    expect(login.token).toBeDefined()
    expect(login.user).toBeDefined()
  })
  it("should able to change password",async () => {
    const changePassword = await authService.changePassword({
      email:"test@gmail.com",
      password:"my new password"
    })
    expect(changePassword.message).toBeDefined()
  })
  it("should able to logout",async () => {
    const logout = await authService.logout("test user id")
    expect(logout.message).toBeDefined() 
  })
  it("should not able to register if given email is already register in DB", async () => {
    const register = authService.register({
     email:"test@gmail.com",
     password:"test password"
   })
   await expect(register).rejects.toBeInstanceOf(ForbiddenException)
  })
  it("should not able to login if email is not valid",async () => {
    const login = authService.login({
      email:"false email",
      password:"test password"
    })
    await expect(login).rejects.toBeInstanceOf(ForbiddenException)
  })
  it("should not able to login if password is not valid",async () => {
    const login = authService.login({
      email:"test@gmail.com",
      password:"false password"
    })
    await expect(login).rejects.toBeInstanceOf(ForbiddenException)
  })
  it("should not able to logout if email is not valid",async () => {
    const logout = authService.logout("false email")
    await expect(logout).rejects.toBeInstanceOf(ForbiddenException)
  })
  it("should not able to update password if given email is not found",async () => {
    const changePassword = authService.changePassword({
      email:"false email",
      password:"test update password"
    })
    await expect(changePassword).rejects.toBeInstanceOf(NotFoundException)
  })
})