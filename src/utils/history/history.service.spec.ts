/* eslint-disable prettier/prettier */
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { TestingModule,Test } from "@nestjs/testing";
import { HistoryRecordRepository } from "./history.repository";
import { HistoryRecordService } from "./history.service";
describe("history service",() => {
  let historyService:HistoryRecordService
  let historyRepository:DeepMocked<HistoryRecordRepository>
  beforeEach(async () => {
    const module:TestingModule = await Test.createTestingModule({
      providers:[
        HistoryRecordService,
        {
         provide:HistoryRecordRepository,
         useValue:createMock<HistoryRecordRepository>()
        }
      ]
    }).compile()
    historyService = module.get<HistoryRecordService>(HistoryRecordService)
    historyRepository = module.get(HistoryRecordRepository)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("should be define",() => {
    expect(historyService).toBeDefined()
    expect(historyRepository).toBeDefined()
  })
  it("should call createShowsHistory method with expected params",async () => {
    const spyCreateShowsHistory = jest.spyOn(historyService,"createShowsHistory")
    const param = {
     userId:"test user id",
     showsId:"test shows id",
     showsTitle:"test shows title",
     activityId:9
    }
    historyService.createShowsHistory(param)
    expect(spyCreateShowsHistory).toBeCalledWith(param)
   })
  it("should be able to add shows history record",async () => {
    const createShowHistoryRecord = await historyService.createShowsHistory({
      userId:"test user id",
      showsId:"test shows id",
      showsTitle:"test shows title",
      activityId:9
    })
    expect(createShowHistoryRecord).toBeDefined()
    expect(historyRepository.createHistory).toBeCalled()
  })
  it("should call createReviewHistory method with expected params",async () => {
    const spyCreateReviewHistory = jest.spyOn(historyService,"createReviewHistory")
    const param = {
     userId:"test user id",
     showsId:"test shows id",
     showsTitle:"test shows title",
     activityId:9,
     review:"test review"
    }
    historyService.createReviewHistory(param)
    expect(spyCreateReviewHistory).toBeCalledWith(param)
   })
  it("should be able to add review history record",async () => {
    const createReviewHistoryRecord = await historyService.createReviewHistory({
      userId: "test user id",
      showsId: "test shows id",
      showsTitle: "test shows title",
      activityId: 9,
      review: "test review"
    })
    expect(createReviewHistoryRecord).toBeDefined()
    expect(historyRepository.createHistory).toBeCalled()
  })
  it("should call deleteHistoryRecord method with expected params",async () => {
    const spyDeleteHistoryRecord = jest.spyOn(historyService,"deleteHistoryRecord")
    const param = "test id"
    historyService.deleteHistoryRecord(param)
    expect(spyDeleteHistoryRecord).toBeCalledWith(param)
   })
  it("should able to delete history record",async () => {
    historyRepository.deleteHistory.mockResolvedValueOnce({})
    const deleteHistoryRecord = await historyService.deleteHistoryRecord("test id")
    expect(deleteHistoryRecord).toBeDefined()
    expect(historyRepository.deleteHistory).toBeCalled()
  })
})