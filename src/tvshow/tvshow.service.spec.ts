/* eslint-disable prettier/prettier */
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test,TestingModule } from "@nestjs/testing";
import { TvshowRepository } from "./tvshow.repository";
import { TvshowService } from "./tvshow.service";
import { HistoryRecordService } from "../utils/history/history.service";
import { NotFoundException } from "@nestjs/common";
import { TvshowDto } from './tvshow.dto';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
describe("tvshow service",() => {
  let tvshowService:TvshowService
  let tvshowRepository:DeepMocked<TvshowRepository>
  let historyRecordService:DeepMocked<HistoryRecordService>
  beforeEach(async () => {
    const module:TestingModule = await Test.createTestingModule({
      providers:[
        TvshowService,
        {
          provide:TvshowRepository,
          useValue:createMock<TvshowRepository>()
        },
        {
          provide:HistoryRecordService,
          useValue:createMock<HistoryRecordService>()
        }
      ]
    }).compile()
    tvshowService = module.get<TvshowService>(TvshowService)
    tvshowRepository = module.get(TvshowRepository)
    historyRecordService = module.get(HistoryRecordService)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("should be define",() => {
    expect(tvshowService).toBeDefined()
    expect(tvshowRepository).toBeDefined()
    expect(historyRecordService).toBeDefined()
  })
  it("should call addTvShow method with expected params", async () => {
    const spyAddTvShow = jest.spyOn(tvshowService,"addTvShow")
    const addTvShowDto = new TvshowDto()
    tvshowService.addTvShow(addTvShowDto)
    expect(spyAddTvShow).toHaveBeenCalledWith(addTvShowDto)
   })
  it("should able to add tvshow",async () => {
    const addTvShow = await tvshowService.addTvShow({
      tvShowId:"test tvshow id",
      tvShowTitle: "test tvshow title",
      posterId: "test tvshow poster",
      userId: "test user id"
    })
    expect(addTvShow.message).toBeDefined()
    expect(tvshowRepository.addTvShow).toBeCalled()
    expect(historyRecordService.createShowsHistory).toBeCalled()
  })
  it("should call getTvShow method with expected params", async () => {
    const spyGetTvShow = jest.spyOn(tvshowService,"getTvShow")
    const param = {
      tvshowId:"test tvshow id",
      userId:"test user id"
    }
    tvshowService.getTvShow(param.tvshowId,param.userId)
    expect(spyGetTvShow).toHaveBeenCalledWith(param.tvshowId,param.userId)
   })
  it("should able to get tvshow data",async () => {
    tvshowRepository.getTvShow.mockResolvedValueOnce({
      id:"test user id",
      tvShow_id:"test tvshow id",
      tvShow_title:"test tvshow title",
      tvShow_poster_id:"test tvshow poster",
      user_id:"test user id"
    })
    const getTvShow = await tvshowService.getTvShow("test tvshow id","test user id")
    expect(getTvShow.message).toBeDefined()
    expect(getTvShow.tvshow).toBeDefined()
    expect(tvshowRepository.getTvShow).toBeCalled()
  })
  it("should call deleteTvShow method with expected params", async () => {
    const spyDeleteTvShow = jest.spyOn(tvshowService,"deleteTvShow")
    const param = "test tvshow id"
    tvshowService.deleteTvShow(param)
    expect(spyDeleteTvShow).toHaveBeenCalledWith(param)
   })
  it("should able delete tvshow data",async () => {
    tvshowRepository.deleteTvShow.mockResolvedValueOnce({
      id:"test user id",
      tvShow_id:"test tvshow id",
      tvShow_title:"test tvshow title",
      tvShow_poster_id:"test tvshow poster",
      user_id:"test user id"
    })
    const deleteTvShow = await tvshowService.deleteTvShow("test user id")
    expect(deleteTvShow.message).toBeDefined()
    expect(tvshowRepository.getTvShow).toBeCalled()
    expect(tvshowRepository.deleteTvShow).toBeCalled()
    expect(historyRecordService.createShowsHistory).toBeCalled()
  })
  it("should not able to add tvshow if user id is not valid",async () => {
    tvshowRepository.addTvShow.mockImplementationOnce(() => Promise.reject(PrismaClientKnownRequestError))
    const addTvShow = tvshowService.addTvShow({
     tvShowId:"test tvshow id",
     tvShowTitle: "test tvshow title",
     posterId: "test tvshow poster",
     userId: "false user id"
    })
    await expect(addTvShow).rejects.toThrowError()
    expect(tvshowRepository.addTvShow).toBeCalled()
    expect(historyRecordService.createShowsHistory).toBeCalledTimes(0)
  })
  it("should not able to get tvshow data if user id is not valid",async () => {
    tvshowRepository.getTvShow.mockResolvedValueOnce(null)
    const getTvShow = tvshowService.getTvShow("test tvshow id","false user id")
    await expect(getTvShow).rejects.toBeInstanceOf(NotFoundException)
    expect(tvshowRepository.getTvShow).toBeCalled()
  })
  it("should not able to get tvshow data if tvshow id is not valid",async () => {
    tvshowRepository.getTvShow.mockResolvedValueOnce(null)
    const getTvShow = tvshowService.getTvShow("false tvshow id","test user id")
    await expect(getTvShow).rejects.toBeInstanceOf(NotFoundException)
    expect(tvshowRepository.getTvShow).toBeCalled()
  })
 it("should not able to delete tvshow data if tvshow id is not valid",async () => {
  tvshowRepository.getTvShow.mockResolvedValueOnce(null)
   const deleteTvShow = tvshowService.deleteTvShow("false tvshow id")
   await expect(deleteTvShow).rejects.toBeInstanceOf(NotFoundException)
   expect(tvshowRepository.getTvShow).toBeCalled()
   expect(tvshowRepository.deleteTvShow).toBeCalledTimes(0)
   expect(historyRecordService.createShowsHistory).toBeCalledTimes(0)
 })
})