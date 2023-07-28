/* eslint-disable prettier/prettier */
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test,TestingModule } from "@nestjs/testing";
import { ProfileService } from "./profile.service";
import { ProfileRepository } from "./profile.repository";
import { NotFoundException,ForbiddenException } from "@nestjs/common"
import { ProfileUpdateDto } from './profile.dto';
describe("profile service",() => {
  let profileService:ProfileService
  let profileRepository:DeepMocked<ProfileRepository>
  beforeEach(async () => {
   const module:TestingModule = await Test.createTestingModule({
    providers:[
      ProfileService,
      {
        provide:ProfileRepository,
        useValue:createMock<ProfileRepository>()
      },
    ]
   }).compile()
   profileService = module.get<ProfileService>(ProfileService)
   profileRepository = module.get(ProfileRepository)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("should be define",() => {
    expect(profileRepository).toBeDefined()
    expect(profileService).toBeDefined()
  })
  it("should call getProfile method with expected param",() => {
    const spyGetProfile = jest.spyOn(profileService,"getProfile")
    const param = "test profile id"
    profileService.getProfile(param)
    expect(spyGetProfile).toHaveBeenCalledWith(param)
  })
  it("should able to get profile data",async () => {
    profileRepository.getProfile.mockResolvedValueOnce({
     id:"test profile id",
     sub:"test sub",
     username:"test username",
     avatarId:"test avatar id",
     about:"test about"
    })
    const getProfile = await profileService.getProfile("test sub id")
    expect(getProfile.message).toBeDefined()
    expect(getProfile.profile).toBeDefined()
    expect(profileRepository.getProfile).toBeCalled()
  })
  it("should call editProfile method with expected param",() => {
    const spyEditProfile = jest.spyOn(profileService,"editProfile")
    const param = "test review id"
    const updateDto = new ProfileUpdateDto()
    profileService.editProfile(param,updateDto)
    expect(spyEditProfile).toBeCalledWith(param,updateDto)
  })
  it("should able to edit profile",async () => {
    profileRepository.getProfile.mockResolvedValueOnce({
     id:"test profile id",
     sub:"test sub",
     username:"test username",
     avatarId:"test avatar id",
     about:"test about"
    })
    const editProfile = await profileService.editProfile("test profile id ",{
     about: "test about",
     username: "test username",
     avatarId:"test avatar id"
    })
    expect(editProfile.message).toBeDefined()
    expect(profileRepository.updateProfile).toBeCalled()
  })
  it("show throw not found exception if profile is not found",async () => {
    profileRepository.getProfile.mockResolvedValueOnce(null)
    const getProfile = profileService.getProfile("false sub id")
    await expect(getProfile).rejects.toBeInstanceOf(NotFoundException)
  })
  it("should not able to edit review if user id is not valid",async () => {
    profileRepository.getProfile.mockResolvedValueOnce(null)
    const editProfile = profileService.editProfile("false sub id ",{
      about: "test about",
      username: "test username",
      avatarId:"test avatar id"
     })
    await expect(editProfile).rejects.toBeInstanceOf(ForbiddenException)
  })
})