/* eslint-disable prettier/prettier */
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { ValidationPipe,INestApplication } from '@nestjs/common';
import { MovieDto } from "../src/movie/movie.dto";
import { TvshowDto } from "src/tvshow/tvshow.dto";
import { ReviewDto,UpdateReviewDto } from "../src/review/review.dto";
import * as supertest from "supertest";
describe("App e2e",() => {
 let app:INestApplication
 let access_token:string
 let movieId:string
 let tvshowId:string
 let reviewId:string
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
  movieId = process.env.MOVIE_ID
  tvshowId = process.env.TVSHOW_ID
  reviewId = process.env.REVIEW_ID
  await app.listen(3000)
 })
 afterAll(() => {
  app.close()
 })
 describe("movie",() => {
   const dto:MovieDto = {
     userId:process.env.USER_ID,
     movieId:"test movie id",
     movieTitle:"test movie title",
     posterId:"test movie poster"
   }
  describe("POST /movie",() => {
    it("should able to add movie",async () => {
     return supertest(app.getHttpServer())
     .post("/movie")
     .set("Authorization",`Bearer ${access_token}`)
     .send(dto)
     .expect(201)
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
      return supertest(app.getHttpServer())
      .post("/movie")
      .set("Authorization","Bearer false-token")
      .send(dto)
      .expect(401)
    })
    it("should throw bad request exception if movieId is empty",() => {
      return supertest(app.getHttpServer())
      .post("/movie")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        movieId:"",
        userId:dto.userId,
        movieTittle:dto.movieTitle,
        posterId:dto.posterId
      })
      .expect(400)
    })
    it("should throw bad request exception if movieTitle is empty",() => {
      return supertest(app.getHttpServer())
      .post("/movie")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        movieId:dto.movieId,
        userId:dto.userId,
        movieTittle:"",
        posterId:dto.posterId
      })
      .expect(400)
    })
    it("should throw bad request exception if userId is empty",() => {
      return supertest(app.getHttpServer())
      .post("/movie")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        movieId:dto.movieId,
        userId:"",
        movieTittle:dto.movieTitle,
        posterId:dto.posterId
      })
      .expect(400)
    })
    it("should throw bad request exception if posterId is empty",() => {
      return supertest(app.getHttpServer())
      .post("/movie")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        movieId:dto.movieId,
        userId:dto.userId,
        movieTittle:dto.movieTitle,
        posterId:""
      })
      .expect(400)
    })
  })
  describe("GET /movie",() => {
    it("should able to get movie",() => {
      return supertest(app.getHttpServer())
      .get("/movie")
      .set("Authorization",`Bearer ${access_token}`)
      .query({movieId:dto.movieId,userId:dto.userId})
      .expect(200)
    })
    it("should throw not found exception if movie is not found",() => {
      return supertest(app.getHttpServer())
      .get("/movie")
      .set("Authorization",`Bearer ${access_token}`)
      .query({movieId:"false movie id",userId:dto.userId})
      .expect(404)
    })
    it("should throw bad request exception if movieId is empty",() => {
      return supertest(app.getHttpServer())
      .get("/movie")
      .set("Authorization",`Bearer ${access_token}`)
      .query({userId:dto.userId})
      .expect(400)
    })
    it("should throw bad request exception if userId is empty",() => {
      return supertest(app.getHttpServer())
      .get("/movie")
      .set("Authorization",`Bearer ${access_token}`)
      .query({movieId:dto.movieId,userId:""})
      .expect(400)
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
      return supertest(app.getHttpServer())
      .get("/movie")
      .set("Authorization","Bearer false token")
      .query({movieId:"false movie id",userId:dto.userId})
      .expect(401)
    })
  })
  describe("DELETE /movie",() => {
    it("should able to delete movie",() => {
      return supertest(app.getHttpServer())
      .delete(`/movie/${movieId}`)
      .set("Authorization",`Bearer ${access_token}`)
      .expect(200)
    })
    it("should throw not found exception if movie is not found",() => {
      return supertest(app.getHttpServer())
      .delete(`/movie/${movieId}`)
      .set("Authorization",`Bearer ${access_token}`)
      .expect(404)
    })
    it("should throw bad request exception if movie id is not valid uuid",() => {
      return supertest(app.getHttpServer())
      .delete(`/movie/1`)
      .set("Authorization",`Bearer ${access_token}`)
      .expect(400)
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
        return supertest(app.getHttpServer())
      .delete(`/movie/${movieId}`)
      .set("Authorization","Bearer false token")
      .expect(401)
    })
   })
 })
 describe("tvshow",() => {
  const dto:TvshowDto = {
    tvShowId:"test tv show id",
    tvShowTitle:"test tv show title",
    userId:process.env.USER_ID,
    posterId:"test poster id"  
  }
  describe("POST /tvshow",() => {
    it("should able to add tv show",() => {
      return supertest(app.getHttpServer())
      .post("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .send(dto)
      .expect(201)
    })
    it("should throw bad request exception if tvshow id is empty",() => {
      return supertest(app.getHttpServer())
      .post("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        tvShowId:"",
        tvShowTitle:dto.tvShowTitle,
        userId:dto.userId,
        posterId:dto.posterId 
      })
    })
    it("should throw bad request exception if tvshow title is empty",() => {
      return supertest(app.getHttpServer())
      .post("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        tvShowId:dto.tvShowId,
        tvShowTitle:"",
        userId:dto.userId,
        posterId:dto.posterId
      })
    })
    it("should throw bad request exception if poster id is empty",() => {
      return supertest(app.getHttpServer())
      .post("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        tvShowId:dto.tvShowId,
        tvShowTitle:dto.tvShowTitle,
        userId:dto.userId,
        posterId:""
      })
    })
    it("should throw bad request exception if tvshow title is empty",() => {
      return supertest(app.getHttpServer())
      .post("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        tvShowId:dto.tvShowId,
        tvShowTitle:dto.tvShowTitle,
        userId:"",
        posterId:dto.posterId
      })
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
      return supertest(app.getHttpServer())
      .post("/tvshow")
      .set("Authorization","Bearer false token")
      .send(dto)
      .expect(401)
    })
  })
  describe("GET /tvshow",() => {
    it("should able to get tvshow",() => {
      return supertest(app.getHttpServer())
      .get("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .query({tvshowId:dto.tvShowId,userId:dto.userId})
      .expect(200)
    })
    it("should throw bad request exception if tvshow id is empty",() => {
      return supertest(app.getHttpServer())
      .get("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .query({tvshowId:"",userId:dto.userId})
      .expect(400)
    })
    it("should throw bad request exception if user id is empty",() => {
      return supertest(app.getHttpServer())
      .get("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .query({tvshowId:dto.tvShowId,userId:""})
      .expect(400)
    })
    it("should throw not found exception if tvshow is not found",() => {
      return supertest(app.getHttpServer())
      .get("/tvshow")
      .set("Authorization",`Bearer ${access_token}`)
      .query({tvshowId:"false tvshow id",userId:dto.userId})
      .expect(404)
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
      return supertest(app.getHttpServer())
      .post("/tvshow")
      .set("Authorization","Bearer false token")
      .query({tvshowId:dto.tvShowId,userId:dto.userId})
      .expect(401)
    })
  })
  describe("DELETE /tvshow",() => {
    it("should able to delete tvshow",() => {
      return supertest(app.getHttpServer())
      .delete(`/tvshow/${tvshowId}`)
      .set("Authorization",`Bearer ${access_token}`)
      .expect(200)
    })
    it("should throw not found exception if tvshow is not found",() => {
      return supertest(app.getHttpServer())
      .delete(`/tvshow/${tvshowId}`)
      .set("Authorization",`Bearer ${access_token}`)
      .expect(404)
    })
    it("should throw bad request exception if tvshow id is not valid uuid",() => {
      return supertest(app.getHttpServer())
      .delete("/tvshow/123")
      .set("Authorization",`Bearer ${access_token}`)
      .expect(400)
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
      return supertest(app.getHttpServer())
      .delete(`/tvshow/${tvshowId}`)
      .set("Authorization","Bearer false token")
      .expect(401)
    })
  })
 })
 //end tvshow route
 //review route
 describe("review",() => {
  const dto:ReviewDto = {
   userId:process.env.USER_ID,
   review:"test review",
   showId:"test show id",
   showTitle:"test show title",
  }
  const updateDto:UpdateReviewDto = {
    review:"test update review"
  }
  describe("POST /review",() => {
    it("should able to create review",() => {
      return supertest(app.getHttpServer())
      .post("/review")
      .set("Authorization",`Bearer ${access_token}`)
      .send(dto)
      .expect(201)
    })
    it("should throw bad request exception if user id is empty",() => {
      return supertest(app.getHttpServer())
      .post("/review")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        userId:"",
        review:dto.review,
        showId:dto.showId,
        showTitle:dto.showTitle
      })
    })
    it("should throw bad request exception if review is empty",() => {
      return supertest(app.getHttpServer())
      .post("/review")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        userId:dto.userId,
        review:"",
        showId:dto.showId,
        showTitle:dto.showTitle
      })
    })
    it("should throw bad request exception if show id is empty",() => {
      return supertest(app.getHttpServer())
      .post("/review")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        userId:dto.userId,
        review:dto.review,
        showId:"",
        showTitle:dto.showTitle
      })
    })
    it("should throw bad request exception if show title is empty",() => {
      return supertest(app.getHttpServer())
      .post("/review")
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        userId:dto.userId,
        review:dto.review,
        showId:dto.showId,
        showTitle:""
      })
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
      return supertest(app.getHttpServer())
      .post("/review")
      .set("Authorization","Bearer false token")
      .send(dto)
      .expect(401)
    })
  })
  describe("GET /review",() => {
    it("should able get review",() => {
      return supertest(app.getHttpServer())
      .get(`/review/${dto.showId}`)
      .expect(200)
    })
    it("should throw not found exception if review is not found",() => {
      return supertest(app.getHttpServer())
      .get("/review/123")
      .expect(404)
    })
  })
  describe("PATCH /review",() => {
    it("should able to update review",() => {
      return supertest(app.getHttpServer())
      .patch(`/review/${reviewId}`)
      .set("Authorization",`Bearer ${access_token}`)
      .send(updateDto)
      .expect(200)
    })
    it("should throw bad request exception if review id is not valid uuid",() => {
      return supertest(app.getHttpServer())
      .patch("/review/133")
      .set("Authorization",`Bearer ${access_token}`)
      .send(updateDto)
      .expect(400)
    })
    it("should throw bad request exception if updated review is empty",() => {
      return supertest(app.getHttpServer())
      .patch(`/review/${reviewId}`)
      .set("Authorization",`Bearer ${access_token}`)
      .send({
        review:""
      })
      .expect(400)
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
      return supertest(app.getHttpServer())
      .patch(`/review/${reviewId}`)
      .set("Authorization","Bearer false token")
      .send(updateDto)
      .expect(401)
    })
  })
  describe("DELETE /review",() => {
    it("should able to delete review",() => {
      return supertest(app.getHttpServer())
      .delete(`/review/${reviewId}`)
      .set("Authorization",`Bearer ${access_token}`)
      .expect(200)
    })
    it("should throw not found exception if review is not found",() => {
      return supertest(app.getHttpServer())
      .delete(`/review/${reviewId}`)
      .set("Authorization",`Bearer ${access_token}`)
      .expect(404)
    })
    it("should throw bad request exception if review id is not valid uuid",() => {
      return supertest(app.getHttpServer())
      .delete("/review/123")
      .set("Authorization",`Bearer ${access_token}`)
      .expect(400)
    })
    it("should throw unauthorized exception if access_token is not valid",() => {
      return supertest(app.getHttpServer())
      .delete(`/review/${reviewId}`)
      .set("Authorization","Bearer false token")
      .expect(401)
    })
  })
 })
})