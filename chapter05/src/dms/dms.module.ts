import { Module } from '@nestjs/common';
import {DMsService} from "@/dms/dms.service";
import {DMsController} from "@/dms/dms.controller";

@Module({
  providers: [DMsService],
  controllers: [DMsController]
})
export class DmsModule {}
