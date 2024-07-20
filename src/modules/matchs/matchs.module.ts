import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsController } from './matchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourmentEntity } from 'src/database/entities/tourment.entity';
import { MatchsEntity } from 'src/database/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourmentEntity, MatchsEntity])],
  controllers: [MatchsController],
  providers: [MatchsService],
})
export class MatchsModule {}
