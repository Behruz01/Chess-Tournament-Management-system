import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateLeaderboardDto } from './dto/create-leaderboard.dto';
import { UpdateLeaderboardDto } from './dto/update-leaderboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TourmentEntity } from 'src/database/entities/tourment.entity';
import { TourmentRepo } from 'src/database/repositories/tourment.repo';
import { PlayersEntity } from 'src/database/entities/players.entity';
import { PlayerRepo } from 'src/database/repositories/players.repo';
import { LeaderboardEntity } from 'src/database/entities/leaderboard.entity';
import { LeaderboardRepo } from 'src/database/repositories/leaderboard.repo';
import { MatchsEntity } from 'src/database/entities/match.entity';
import { MatchRepo } from 'src/database/repositories/match.repo';

@Injectable()
export class LeaderboardsService {
  constructor(
    @InjectRepository(TourmentEntity)
    private readonly tourmentRepo: TourmentRepo,
    @InjectRepository(PlayersEntity) private readonly playerRepo: PlayerRepo,
    @InjectRepository(LeaderboardEntity) private readonly repo: LeaderboardRepo,
    @InjectRepository(MatchsEntity) private readonly matchRepo: MatchRepo,
  ) {}

  async generateLeaderboard(
    createLeaderboardDto: CreateLeaderboardDto,
  ): Promise<{ message: string }> {
    try {
      const { tournament_id } = createLeaderboardDto;

      // Fetch tournament with participants and related matches
      const tournament = await this.tourmentRepo.findOne({
        where: { id: tournament_id },
        relations: ['tourmentParticipants', 'tourmentParticipants.player'],
      });

      if (!tournament) {
        throw new NotFoundException('Tournament not found');
      }

      // Fetch all matches related to the tournament
      const matches = await this.matchRepo.find({
        where: { tourment: { id: tournament.id } },
        relations: ['first_player', 'second_player'], // Ensure relationships are fetched
      });

      const pointsMap = new Map<string, number>();

      matches.forEach((match) => {
        if (!match.first_player || !match.second_player) {
          console.warn('Match missing player data:', match); // Warn if player data is missing
          return;
        }

        const firstPlayerId = match.first_player.id;
        const secondPlayerId = match.second_player.id;
        const firstPlayerPoints = pointsMap.get(firstPlayerId) || 0;
        const secondPlayerPoints = pointsMap.get(secondPlayerId) || 0;

        if (match.first_player_score > match.second_player_score) {
          pointsMap.set(firstPlayerId, firstPlayerPoints + 3); // Winner gets 3 points
          pointsMap.set(secondPlayerId, secondPlayerPoints + 0); // Loser gets 0 points
        } else if (match.first_player_score < match.second_player_score) {
          pointsMap.set(firstPlayerId, firstPlayerPoints + 0);
          pointsMap.set(secondPlayerId, secondPlayerPoints + 3);
        } else {
          pointsMap.set(firstPlayerId, firstPlayerPoints + 1); // Draw gets 1 point
          pointsMap.set(secondPlayerId, secondPlayerPoints + 1);
        }
      });

      const leaderboardEntries: LeaderboardEntity[] = [];
      let rank = 1;
      for (const [playerId, points] of Array.from(pointsMap.entries()).sort(
        (a, b) => b[1] - a[1],
      )) {
        const player = await this.playerRepo.findOne({
          where: { id: playerId },
        });
        if (player) {
          const leaderboardEntry = new LeaderboardEntity();
          leaderboardEntry.tourment = tournament;
          leaderboardEntry.player = player;
          leaderboardEntry.points = points;
          leaderboardEntry.rank = rank++;
          leaderboardEntries.push(leaderboardEntry);
        } else {
          console.warn('Player not found for ID:', playerId); // Warn if player is not found
        }
      }

      await this.repo.save(leaderboardEntries);

      return { message: 'Leaderboard created successfully' };
    } catch (error) {
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find({ relations: ['tourment', 'player'] });
      return data;
    } catch (error) {
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const leaderboard = await this.repo.findOne({ where: { id } });
      if (!leaderboard) {
        throw new NotFoundException(`Leaderboard with ID ${id} not found`);
      }
      return leaderboard;
    } catch (error) {
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateLeaderboardDto: UpdateLeaderboardDto) {
    try {
      const leaderboard = await this.repo.findOne({ where: { id } });
      if (!leaderboard) {
        throw new NotFoundException(`Leaderboard with ID ${id} not found`);
      }
      await this.repo.update({ id }, {});
      return { message: 'Leaderboard updated successfully' };
    } catch (error) {
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const leaderboard = await this.repo.findOne({ where: { id } });
      if (!leaderboard) {
        throw new NotFoundException(`Leaderboard with ID ${id} not found`);
      }
      await this.repo.delete({ id });
      return { message: 'Leaderboard deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
