/* eslint-disable prettier/prettier */
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test,TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieRepository } from "./movie.repository";
import { MovieDto } from './movie.dto';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
describe('Movie service',() => {
  let movieService:MovieService
  let movieRepository:DeepMocked<MovieRepository>
  beforeEach(async () => {
    const module:TestingModule = await Test.createTestingModule({
      providers:[
        MovieService,
        {
          provide:MovieRepository,
          useValue:createMock<MovieRepository>()
        },
    ]
    }).compile()
    movieService = module.get<MovieService>(MovieService)
    movieRepository = module.get(MovieRepository)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
   it("should be define",() => {
    expect(movieService).toBeDefined()
    expect(movieRepository).toBeDefined()
   })
   it("should call addMovie method with expected params", async () => {
     const spyAddMovie = jest.spyOn(movieService,"addMovie")
     const addMovieDto = new MovieDto()
     movieService.addMovie(addMovieDto)
     expect(spyAddMovie).toHaveBeenCalledWith(addMovieDto)
   })
   it("should able to add movie",async () => {
    const addMovie = await movieService.addMovie({
      movieId: 123,
      movieTitle: "test movie title",
      posterId: "test movie poster",
      userId: "false user id"
    })
    expect(addMovie.message).toBeDefined()
    expect(movieRepository.addMovie).toHaveBeenCalled()
    expect(movieRepository.addMovie).toHaveReturned()
   })
   it("should call getMovie method with expected params",async () => {
     const spyGetMovie = jest.spyOn(movieService,"getMovie")
     const param:{movieId:number,userId:string} = {
       movieId:123,
       userId:"test user id"
     }
     movieService.getMovie(param.movieId,param.userId)
     expect(spyGetMovie).toBeCalledWith(param.movieId,param.userId)
   })
   it("should able to get movie data",async () => {
    movieRepository.getMovie.mockResolvedValueOnce({
      id:"test movie id",
      movie_id: 123,
      title: "test movie title",
      poster_path: "test movie poster",
      user_id: "test user id"
    })
    const getMovie = await movieService.getMovie(123,'test user id')
    expect(getMovie.message).toBeDefined()
    expect(getMovie.movie).toBeDefined()
    expect(movieRepository.getMovie).toHaveBeenCalled()
    expect(movieRepository.getMovie).toHaveReturned()
   })
   it("should call deleteMovie method with expected params",async () => {
     const spyDeleteMovie = jest.spyOn(movieService,"deleteMovie")
     const param = "test movie id"
     movieService.deleteMovie(param)
     expect(spyDeleteMovie).toBeCalledWith(param)
   })
   it("should able to delete movie",async () => {
    movieRepository.deleteMovie.mockResolvedValueOnce({
      id:"test movie id",
      movie_id:123,
      title:"test movie title",
      poster_path:"test movie poster",
      user_id:"test user id"
    })
    const deleteMovie = await movieService.deleteMovie("test movie id")
    expect(deleteMovie.message).toBeDefined()
    expect(deleteMovie.movie).toBeDefined()
    expect(movieRepository.getMovie).toBeCalled()
    expect(movieRepository.deleteMovie).toBeCalled()
    expect(movieRepository.deleteMovie).toHaveReturned()
   })
   it("should not able to add movie if user id is not valid",async () => {
      movieRepository.addMovie.mockImplementationOnce(() => Promise.reject(PrismaClientKnownRequestError))
      const createReview = movieService.addMovie({
        movieId: 123,
        movieTitle: "test movie title",
        posterId: "test movie poster",
        userId: "false user id"
      })
      await expect(createReview).rejects.toThrowError()
      expect(movieRepository.addMovie).toBeCalled()
   })
   it("should not able to get movie data if user id is not valid",async () => {
    movieRepository.getMovie.mockResolvedValueOnce(null)
    const getMovie = movieService.getMovie(122,'false user id')
    await expect(getMovie).rejects.toBeInstanceOf(NotFoundException)
    expect(movieRepository.getMovie).toBeCalled()
   })
   it("should not able to get movie data if movie id is not valid",async () => {
    movieRepository.getMovie.mockResolvedValueOnce(null)
    const getMovie = movieService.getMovie(122,"test user id")
    await expect(getMovie).rejects.toBeInstanceOf(NotFoundException)
    expect(movieRepository.getMovie).toBeCalled()
   })
   it("should not able to delete movie data if movie id is not valid",async () => {
    movieRepository.getMovie.mockResolvedValueOnce(null)
    const deleteMovie = movieService.deleteMovie("false movie id")
    await expect(deleteMovie).rejects.toBeInstanceOf(NotFoundException)
    expect(movieRepository.getMovie).toBeCalled()
    expect(movieRepository.deleteMovie).toBeCalledTimes(0)
   })
})