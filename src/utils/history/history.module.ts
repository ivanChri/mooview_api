/* eslint-disable prettier/prettier */
import { Module,Global } from "@nestjs/common";
import { HistoryRecordRepository } from "./history.repository";
import { HistoryRecordService } from "./history.service";
@Global()
@Module({
  exports:[HistoryRecordService],
  providers:[
   HistoryRecordRepository,
   HistoryRecordService
  ]
})
export class HistoryRecordModule {}