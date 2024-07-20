import { Module } from '@nestjs/common';
import { TourmentsService } from './tourments.service';
import { TourmentsController } from './tourments.controller';

@Module({
  controllers: [TourmentsController],
  providers: [TourmentsService],
})
export class TourmentsModule {}
