import { Module } from '@nestjs/common';
import { TourmentsService } from './tourments.service';
import { TourmentsController } from './tourments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourmentEntity } from 'src/database/entities/tourment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourmentEntity])],
  controllers: [TourmentsController],
  providers: [TourmentsService],
})
export class TourmentsModule {}
