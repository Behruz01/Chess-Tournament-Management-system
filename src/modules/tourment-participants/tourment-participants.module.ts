import { Module } from '@nestjs/common';
import { TourmentParticipantsService } from './tourment-participants.service';
import { TourmentParticipantsController } from './tourment-participants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourmentParticipantsEntity } from 'src/database/entities/tournamentParticipants.entity';
import { TourmentEntity } from 'src/database/entities/tourment.entity';
import { PlayersEntity } from 'src/database/entities/players.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TourmentParticipantsEntity,
      TourmentEntity,
      PlayersEntity,
    ]),
  ],
  controllers: [TourmentParticipantsController],
  providers: [TourmentParticipantsService],
})
export class TourmentParticipantsModule {}
