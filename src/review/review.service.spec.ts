/* eslint-disable prettier/prettier */
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test,TestingModule } from "@nestjs/testing";
import { ReviewDto,UpdateReviewDto} from './review.dto';
import { ReviewService } from "./review.service";
import { ReviewRepository } from "./review.repository";
import { HistoryRecordService } from "../utils/history/history.service";
import { NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
describe("review service",() => {
 let reviewService:ReviewService
 let reviewRepository:DeepMocked<ReviewRepository>
 let historyRecordService:DeepMocked<HistoryRecordService>
 beforeEach(async () => {
  const module:TestingModule = await Test.createTestingModule({
    providers:[
     ReviewService,
      {
       provide:ReviewRepository,
       useValue:createMock<ReviewRepository>()
      },
      {
       provide:HistoryRecordService,
       useValue:createMock<HistoryRecordService>()
      }
    ]
   }).compile()
   reviewService = module.get<ReviewService>(ReviewService)
   reviewRepository = module.get(ReviewRepository)
   historyRecordService = module.get(HistoryRecordService)
 })
 afterEach(() => {
  jest.clearAllMocks()
 })
 it("should be define",() => {
   expect(reviewService).toBeDefined()
   expect(reviewRepository).toBeDefined()
   expect(historyRecordService).toBeDefined()
 })
 it("should call createReview method with expected params",async () => {
  const spyCreateReview = jest.spyOn(reviewService,"createReview")
  const reviewDto = new ReviewDto()
  reviewService.createReview(reviewDto)
  expect(spyCreateReview).toBeCalledWith(reviewDto)
 })
 it("should able to create review",async () => {
    const createReview = await reviewService.createReview({
      showId: "test id",
      userId: "test user id",
      showTitle: "test title",
      review: "test review"
    })
    expect(createReview.message).toBeDefined()
    expect(reviewRepository.createReview).toHaveBeenCalled()
    expect(reviewRepository.createReview).toHaveReturned()
    expect(historyRecordService.createReviewHistory).toHaveBeenCalled()
 })
 it("should call getReview method with expected params",async () => {
  const spyGetReview = jest.spyOn(reviewService,"getReview")
  const param = "test show id"
  reviewService.getReview(param)
  expect(spyGetReview).toBeCalledWith(param)
 })
 it("should able to get review data",async () => {
   reviewRepository.getReview.mockResolvedValueOnce([
   {
    id:"test id",
    author_id:"test author id",
    review:"test review",
    show_title:"test show title",
    shows_id:"test show id",
    created_at:new Date()
   }
  ])
  const getReview = await reviewService.getReview("test id")
  expect(getReview.message).toBeDefined()
  expect(getReview.reviews).toBeDefined()
  expect(getReview.reviews).toHaveLength(1)
  expect(reviewRepository.getReview).toHaveReturned()
  expect(reviewRepository.getReview).toBeCalled()
 })
 it("should call deleteReview method with expected params",async () => {
  const spyDeleteReview = jest.spyOn(reviewService,"deleteReview")
  const param = "test review id"
  reviewService.deleteReview(param)
  expect(spyDeleteReview).toBeCalledWith(param)
 })
 it("should able to delete review",async () => {
  const deleteReview = await reviewService.deleteReview("test id")
  expect(deleteReview.message).toBeDefined()
  expect(reviewRepository.getReviewById).toBeCalled()
  expect(reviewRepository.deleteReview).toBeCalled()
  expect(reviewRepository.deleteReview).toHaveReturned()
  expect(historyRecordService.createReviewHistory).toBeCalled()
 })
 it("should call editReview method with expected params",async () => {
  const spyEditReview = jest.spyOn(reviewService,"editReview")
  const param = "test show id"
  const updateDto = new UpdateReviewDto()
  reviewService.editReview(param,updateDto)
  expect(spyEditReview).toBeCalledWith(param,updateDto)
 })
 it("should able to edit review",async () => {
  reviewRepository.editReview.mockResolvedValueOnce({
    id:"test id",
    author_id:"test author id",
    review:"test review update",
    show_title:"test show title",
    shows_id:"test show id",
    created_at:new Date()
  })
  const editReview = await reviewService.editReview("test id",{
    review:"test review update"
  })
  expect(editReview.message).toBeDefined()
  expect(reviewRepository.getReviewById).toBeCalled()
  expect(reviewRepository.editReview).toBeCalled()
  expect(historyRecordService.createReviewHistory).toBeCalled()
 })
 it("should throw not found exception if no review match with shows id",async () => {
  reviewRepository.getReview.mockResolvedValueOnce([])
  const getReview = reviewService.getReview("false review id")
  await expect(getReview).rejects.toBeInstanceOf(NotFoundException)
  expect(reviewRepository.getReview).toBeCalled()
 })
  it("should not able to create review if user id is not valid",async () => {
    reviewRepository.createReview.mockImplementationOnce(() => Promise.reject(PrismaClientKnownRequestError))
    const createReview = reviewService.createReview({
      showId: "test id",
      userId: "false user id",
      showTitle: "test title",
      review: "test review"
    })
    await expect(createReview).rejects.toThrowError()
    expect(reviewRepository.createReview).toBeCalled()
    expect(historyRecordService.createReviewHistory).toBeCalledTimes(0)
  })
  it("should not able to edit review if review id is not valid",async () => {
    reviewRepository.getReviewById.mockResolvedValueOnce(null)
    const editReview = reviewService.editReview("false review id",{
      review:"test review"
    })
    await expect(editReview).rejects.toBeInstanceOf(NotFoundException)
    expect(reviewRepository.getReviewById).toBeCalled()
    expect(reviewRepository.editReview).toBeCalledTimes(0)
    expect(historyRecordService.createReviewHistory).toBeCalledTimes(0)
  })
  it("should not able to delete review if user id is not valid",async () => {
    reviewRepository.getReviewById.mockResolvedValueOnce(null)
    const deleteReview = reviewService.deleteReview("false user id")
    await expect(deleteReview).rejects.toBeInstanceOf(NotFoundException)
    expect(reviewRepository.getReviewById).toBeCalled()
    expect(reviewRepository.editReview).toBeCalledTimes(0)
    expect(historyRecordService.createReviewHistory).toBeCalledTimes(0)
  })
})