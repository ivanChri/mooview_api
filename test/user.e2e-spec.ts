/* eslint-disable prettier/prettier */
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication,ValidationPipe } from "@nestjs/common";
import * as supertest from "supertest";
import { authDto } from "../src/auth/auth.dto";
import { userUpdateDto } from "../src/user/user.dto";
describe("User e2e",() => {
  let app:INestApplication
  let access_token:string
  let user_id:string
  let profile_id:string
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports:[AppModule]
    }).compile()
    app = module.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist:true,
        transform:true
      })
    )
    await app.init()
    access_token = process.env.ACCESS_TOKEN
    user_id = process.env.USER_ID
    profile_id = process.env.PROFILE_ID
    await app.listen(3000)
  })
  afterAll(() => {
    app.close()
  })
  describe("auth",() => {
    const dto:authDto = {
     email:"test@gmail.com",
     password:"test password",
     username:"test username"
    }
    describe("POST /auth/register",() => {
      it("should able to register",() => {
        return supertest(app.getHttpServer())
        .post("/auth/register")
        .send(dto)
        .expect(201)
      })
      it("should throw forbiden exception if email is already register in DB",() => {
        return supertest(app.getHttpServer())
        .post("/auth/register")
        .send(dto)
        .expect(403)
      })
      it("should throw bad request exception if email is empty",() => {
        return supertest(app.getHttpServer())
        .post("/auth/register")
        .send({
          email:"",
          username:dto.username,
          password:dto.password
        })
        .expect(400)
      })
      it("should throw bad request exception if username is empty",() => {
        return supertest(app.getHttpServer())
        .post("/auth/register")
        .send({
          email:dto.email,
          username:"",
          password:dto.password
        })
        .expect(400)
      })
      it("should throw bad request exception if password is empty",() => {
        return supertest(app.getHttpServer())
        .post("/auth/register")
        .send({
          email:dto.email,
          username:dto.username,
          password:""
        })
        .expect(400)
      })
    })
    describe("POST /auth/login",() => {
      it("should able to login",() => {
        return supertest(app.getHttpServer())
        .post("/auth/login")
        .send(dto)
        .expect(201)
      })
      it("should throw forbiden exception if email is not valid",() => {
        return supertest(app.getHttpServer())
        .post("/auth/login")
        .send({
          email:"falseEmail@gmail.com",
          password:dto.password,
          username:dto.username
        })
        .expect(403)
      })
      it("should throw forbiden exception if password is not valid",() => {
        return supertest(app.getHttpServer())
        .post("/auth/login")
        .send({
          email:dto.email,
          password:"false password",
          username:dto.username
        })
        .expect(403)
      })
      it("should throw forbiden exception username is not valid",() => {
        return supertest(app.getHttpServer())
        .post("/auth/login")
        .send({
          email:dto.email,
          password:dto.password,
          username:"false username"
        })
        .expect(403)
      })
      it("should throw bad request exception if email is empty",() => {
        return supertest(app.getHttpServer())
        .post("/auth/login")
        .send({
          email:"",
          password:dto.password,
          username:dto.username
        })
        .expect(400)
      })
      it("should throw bad request exception if password is empty",() => {
        return supertest(app.getHttpServer())
        .post("/auth/login")
        .send({
          email:dto.email,
          password:"",
          username:dto.username
        })
        .expect(400)
      })
      it("should throw bad request exception if username is empty",() => {
        return supertest(app.getHttpServer())
        .post("/auth/login")
        .send({
          email:dto.email,
          password:dto.password,
          username:""
        })
        .expect(400)
      })
    })
    describe("PATCH /auth/password",() => {
      it("should able to change password",() => {
        return supertest(app.getHttpServer())
        .patch("/auth/password")
        .send(dto)
        .expect(200)
      })
      it("should throw not found exception if email is not found",() => {
        return supertest(app.getHttpServer())
        .patch("/auth/password")
        .send({
          email:"falseEmail@gmail.com",
          password:dto.password,
          username:dto.username
        })
        .expect(404)
      })
      it("should throw not found exception if username is not found",() => {
        return supertest(app.getHttpServer())
        .patch("/auth/password")
        .send({
          email:dto.email,
          password:dto.password,
          username:"false username"
        })
        .expect(404)
      })
      it("should throw bad request exception if email is empty",() => {
        return supertest(app.getHttpServer())
        .patch("/auth/password")
        .send({
          email:"",
          password:dto.password,
          username:dto.username
        })
        .expect(400)
      })
      it("should throw bad request exception if password is empty",() => {
        return supertest(app.getHttpServer())
        .patch("/auth/password")
        .send({
          email:dto.email,
          password:"",
          username:dto.username
        })
        .expect(400)
      })
      it("should throw bad request exception if username is empty",() => {
        return supertest(app.getHttpServer())
        .patch("/auth/password")
        .send({
          email:dto.email,
          password:dto.password,
          username:""
        })
        .expect(400)
      })
    })
    describe("DELETE /auth/logout",() => {
      it("should able to logout",() => {
        return supertest(app.getHttpServer())
        .delete(`/auth/logout/${user_id}`)
        .set("Authorization",`Bearer ${access_token}`)
        .expect(204)
      })
      it("should throw forbiden exception if user is not found",() => {
        return supertest(app.getHttpServer())
        .delete("/auth/logout/a83d9a19-b459-454d-9d1c-4b78509f6d88")
        .set("Authorization",`Bearer ${access_token}`)
        .expect(403)
      })
      it("should throw bad request exception if id is not valid uuid",() => {
        return supertest(app.getHttpServer())
        .delete("/auth/logout/122")
        .set("Authorization",`Bearer ${access_token}`)
        .expect(400)
      })
      it("should throw unauthorized exception if access_token is not valid",() => {
        return supertest(app.getHttpServer())
        .delete(`/auth/logout/${user_id}`)
        .set("Authorization",`Bearer false token`)
        .expect(401)
      })
    })
  })
  describe("profile",() => {
    describe("GET /profile",() => {
      it("should able get profile",() => {
        return supertest(app.getHttpServer())
        .get(`/profile/${profile_id}`)
        .expect(200)
      })
      it("should throw not found exception if profile is not found",() => {
        return supertest(app.getHttpServer())
        .get("/profile/a83d9a19-b459-454d-9d1c-4b78509f6d88")
        .expect(404)
      })
      it("should throw bad request exception if profile id is not valid uuid",() => {
        return supertest(app.getHttpServer())
        .get("/profile/122")
        .expect(400)
      })
    })
    describe("PATCH /profile",() => {
      it("should able to edit username",() => {
        return supertest(app.getHttpServer())
        .patch(`/profile/${profile_id}`)
        .set("Authorization",`Bearer ${access_token}`)
        .send({
          username:"new username"
        })
        .expect(200)
      })
      it("should able to edit avatar",() => {
        return supertest(app.getHttpServer())
        .patch(`/profile/${profile_id}`)
        .set("Authorization",`Bearer ${access_token}`)
        .send({
          avatarId:"avatar_2"
        })
        .expect(200)
      })
      it("should able to edit about",() => {
        return supertest(app.getHttpServer())
        .patch(`/profile/${profile_id}`)
        .set("Authorization",`Bearer ${access_token}`)
        .send({
          about:"new about"
        })
        .expect(200)
      })
       it("should throw forbiden exception if profile is not found",() => {
        return supertest(app.getHttpServer())
        .patch("/profile/a83d9a19-b459-454d-9d1c-4b78509f6d88")
        .set("Authorization",`Bearer ${access_token}`)
        .send({
          about:"new about"
        })
        .expect(403)
       })
       it("should throw bad request exception if profile id is not valid uuid",() => {
        return supertest(app.getHttpServer())
        .patch("/profile/122")
        .set("Authorization",`Bearer ${access_token}`)
        .send({
          about:"new about"
        })
        .expect(400)
       })
       it("should throw bad request exception if body is empty",() => {
        return supertest(app.getHttpServer())
        .patch(`/profile/${access_token}`)
        .set("Authorization",`Bearer ${access_token}`)
        .send({})
        .expect(400)
       })
       it("should throw unauthorized exception if access_token is not valid",() => {
        return supertest(app.getHttpServer())
        .patch(`/profile/${profile_id}`)
        .set("Authorization",`Bearer false token`)
        .send({
          about:"new about"
        })
        .expect(401)
      })
    })
  })
    describe("user",() => {
      describe("GET /user",() => {
        it("should able to get user",() => {
          return supertest(app.getHttpServer())
          .get(`/user/${user_id}`)
          .set("Authorization",`Bearer ${access_token}`)
          .expect(200)
        })
        it("should throw bad request exception if user id is not valid uuid",() => {
          return supertest(app.getHttpServer())
          .get("/user/122")
          .set("Authorization",`Bearer ${access_token}`)
          .expect(400)
        })
        it("should throw forbiden exception if user is not found",() => {
          return supertest(app.getHttpServer())
          .get("/user/a83d9a19-b459-454d-9d1c-4b78509f6d88")
          .set("Authorization",`Bearer ${access_token}`)
          .expect(403)
        })
        it("should throw unauthorized exception if access_token is not valid", () => {
          return supertest(app.getHttpServer())
          .get(`/user/${access_token}`)
          .set("Authorization","Bearer false token")
          .expect(401)
        })
      })
      describe("PATCH /user",() => {
        const dto:userUpdateDto = {
          email:"test@gmail.com",
          password:"test password",
          newEmail:"newEmail@gmail.com",
          newPassword:"new password"
        }
        it("should able to update user password and email",() => {
          return supertest(app.getHttpServer())
          .patch(`/user/${user_id}`)
          .set("Authorization",`Bearer ${access_token}`)
          .send(dto)
          .expect(200)
        })
        it("should able to update user email",() => {
          return supertest(app.getHttpServer())
          .patch(`/user/${user_id}`)
          .set("Authorization",`Bearer ${access_token}`)
          .send({
            email:dto.email,
            password:dto.password,
            newEmail:dto.newEmail
          })
          .expect(200)
        })
        it("should able to update user password",() => {
          return supertest(app.getHttpServer())
          .patch(`/user/${user_id}`)
          .set("Authorization",`Bearer ${access_token}`)
          .send({
            email:dto.email,
            password:dto.password,
            newPassword:dto.newPassword
          })
          .expect(200)
        })
        it("should throw forbiden exception if email is not valid",() => {
          return supertest(app.getHttpServer())
          .patch(`/user/${user_id}`)
          .set("Authorization",`Bearer ${access_token}`)
          .send({
            email:"false@gmail.com",
            password:dto.password,
            newEmail:dto.newEmail
          })
          .expect(403)
        })
        it("should throw forbiden exception if password is not valid",() => {
          return supertest(app.getHttpServer())
          .patch(`/user/${user_id}`)
          .set("Authorization",`Bearer ${access_token}`)
          .send({
            email:dto.email,
            password:"false password",
            newEmail:dto.newEmail
          })
          .expect(403)
        })
        it("should throw bad request exception if user id is not valid uuid",() => {
          return supertest(app.getHttpServer())
          .patch(`/user/123`)
          .set("Authorization",`Bearer ${access_token}`)
          .send(dto)
          .expect(400)
        })
        it("should throw unauthorized exception if access_token is not valid",() => {
          return supertest(app.getHttpServer())
          .patch(`/user/${user_id}`)
          .set("Authorization",`Bearer false token`)
          .send(dto)
          .expect(401)
        })
      })
      describe("DELETE /user",() => {
        it("should able to delete history",() => {
          return supertest(app.getHttpServer())
          .delete(`/user/${user_id}`)
          .set("Authorization",`Bearer ${access_token}`)
          .expect(200)
        })
        it("should throw forbiden exception if user is not found",() => {
          return supertest(app.getHttpServer())
          .delete(`/user/a83d9a19-b459-454d-9d1c-4b78509f6d88`)
          .set("Authorization",`Bearer ${access_token}`)
          .expect(403)
        })
        it("should throw bad request exception if user id is not valid uuid",() => {
          return supertest(app.getHttpServer())
          .delete(`/user/123`)
          .set("Authorization",`Bearer ${access_token}`)
          .expect(400)
        })
        it("should throw unauthorized exception if access_token is not valid",() => {
          return supertest(app.getHttpServer())
          .delete(`/user/${user_id}`)
          .set("Authorization",`Bearer false token`)
          .expect(401)
        })
      })
    })
})