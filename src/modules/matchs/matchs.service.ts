import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourmentEntity } from 'src/database/entities/tourment.entity';
import { PlayersEntity } from 'src/database/entities/players.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchsEntity } from 'src/database/entities/match.entity';
import { TourmentRepo } from 'src/database/repositories/tourment.repo';
import { MatchRepo } from 'src/database/repositories/match.repo';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(TourmentEntity)
    private readonly tourmentRepo: TourmentRepo,
    @InjectRepository(MatchsEntity)
    private readonly repo: MatchRepo,
  ) {}

  async findAll(): Promise<MatchsEntity[]> {
    return await this.repo.find({
      relations: ['tourment', 'first_player', 'second_player'],
    });
  }

  async findOne(id: string): Promise<MatchsEntity> {
    return await this.repo.findOne({
      where: { id },
      relations: ['tourment', 'first_player', 'second_player'],
    });
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto,
  ): Promise<{ message: string }> {
    const match = await this.repo.findOne({ where: { id } });
    if (!match) throw new HttpException('Match not found!', 404);

    const { first_player_score, second_player_score } = updateMatchDto;

    await this.repo.update({ id }, { first_player_score, second_player_score });
    return { message: 'Match data updated successfully' };
  }

  async remove(id: string): Promise<{ message: string }> {
    const match = await this.repo.findOne({ where: { id } });
    if (!match) throw new HttpException('Match not found!', 404);
    await this.repo.delete({ id });
    return { message: 'Match deleted successfully' };
  }

  async generateSwissPairings(createMatchDto: CreateMatchDto): Promise<Object> {
    const { tourment_id, round } = createMatchDto;

    const tournament = await this.tourmentRepo.findOne({
      where: { id: tourment_id },
      relations: [
        'tourmentParticipants',
        'tourmentParticipants.player',
        'matchs',
      ],
    });

    if (!tournament) {
      throw new Error('Tournament not found');
    }

    // Get all participants
    const participants: PlayersEntity[] = tournament.tourmentParticipants.map(
      (tp) => tp.player,
    );

    // Sort participants by points and rating
    participants.sort((a, b) => b.points - a.points || b.rating - a.rating);

    // Generate pairings
    const pairings: {
      first_player: PlayersEntity;
      second_player: PlayersEntity | null;
    }[] = [];
    const matchedPlayers: Set<string> = new Set();

    for (let i = 0; i < participants.length; i++) {
      if (matchedPlayers.has(participants[i].id)) continue;

      for (let j = i + 1; j < participants.length; j++) {
        if (matchedPlayers.has(participants[j].id)) continue;

        // Check if these players have already played against each other
        const havePlayed = tournament.matchs.some(
          (match) =>
            match.first_player &&
            match.second_player &&
            ((match.first_player.id === participants[i].id &&
              match.second_player.id === participants[j].id) ||
              (match.first_player.id === participants[j].id &&
                match.second_player.id === participants[i].id)),
        );

        if (!havePlayed) {
          pairings.push({
            first_player: participants[i],
            second_player: participants[j],
          });
          matchedPlayers.add(participants[i].id);
          matchedPlayers.add(participants[j].id);
          break;
        }
      }
    }

    // Handle odd number of players (one player gets a bye)
    if (participants.length % 2 === 1) {
      for (let i = 0; i < participants.length; i++) {
        if (!matchedPlayers.has(participants[i].id)) {
          pairings.push({ first_player: participants[i], second_player: null });
          break;
        }
      }
    }

    // Save matches to the database
    const matches = pairings.map((pair) => {
      const match = new MatchsEntity();
      match.tourment = tournament;
      match.first_player = pair.first_player;
      match.second_player = pair.second_player;
      match.round = round;
      match.first_player_score = null;
      match.second_player_score = null;
      return match;
    });

    await this.repo.save(matches);
    return matches;
  }
}
