import { Module } from '@nestjs/common';
import { LeaderboardsService } from './leaderboards.service';
import { LeaderboardsController } from './leaderboards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourmentEntity } from 'src/database/entities/tourment.entity';
import { PlayersEntity } from 'src/database/entities/players.entity';
import { LeaderboardEntity } from 'src/database/entities/leaderboard.entity';
import { MatchsEntity } from 'src/database/entities/match.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TourmentEntity,
      PlayersEntity,
      LeaderboardEntity,
      MatchsEntity,
    ]),
  ],
  controllers: [LeaderboardsController],
  providers: [LeaderboardsService],
})
export class LeaderboardsModule {}
