import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTourmentParticipantDto } from './dto/create-tourment-participant.dto';
import { UpdateTourmentParticipantDto } from './dto/update-tourment-participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TourmentParticipantsEntity } from 'src/database/entities/tournamentParticipants.entity';
import { TourmentParticipantRepo } from 'src/database/repositories/tourmentParticipands.repo';
import { TourmentEntity } from 'src/database/entities/tourment.entity';
import { TourmentRepo } from 'src/database/repositories/tourment.repo';
import { PlayersEntity } from 'src/database/entities/players.entity';
import { PlayerRepo } from 'src/database/repositories/players.repo';

@Injectable()
export class TourmentParticipantsService {
  constructor(
    @InjectRepository(TourmentParticipantsEntity)
    private readonly repo: TourmentParticipantRepo,
    @InjectRepository(TourmentEntity)
    private readonly tourmentRepo: TourmentRepo,
    @InjectRepository(PlayersEntity) private readonly playerRepo: PlayerRepo,
  ) {}

  async create(
    createTourmentParticipantDto: CreateTourmentParticipantDto,
  ): Promise<{ message: string }> {
    try {
      const { tourment_id, player_id } = createTourmentParticipantDto;

      const tourment = await this.tourmentRepo.findOne({
        where: { id: tourment_id },
      });
      if (!tourment) {
        throw new HttpException('Tournament not found!', HttpStatus.NOT_FOUND);
      }

      const player = await this.playerRepo.findOne({
        where: { id: player_id },
      });
      if (!player) {
        throw new HttpException('Player not found!', HttpStatus.NOT_FOUND);
      }

      const data = this.repo.create({ tourment, player });
      await this.repo.save(data);

      return { message: 'Tournament-participant created successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to create tournament-participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<TourmentParticipantsEntity[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve tournament-participants',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<TourmentParticipantsEntity> {
    try {
      const participant = await this.repo.findOne({ where: { id } });
      if (!participant) {
        throw new HttpException(
          'Tournament-participant not found!',
          HttpStatus.NOT_FOUND,
        );
      }
      return participant;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve tournament-participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateTourmentParticipantDto: UpdateTourmentParticipantDto,
  ): Promise<{ message: string }> {
    try {
      const participant = await this.repo.findOne({ where: { id } });
      if (!participant) {
        throw new HttpException(
          'Tournament-participant not found!',
          HttpStatus.NOT_FOUND,
        );
      }

      const { tourment_id, player_id } = updateTourmentParticipantDto;

      const tourment = await this.tourmentRepo.findOne({
        where: { id: tourment_id },
      });
      if (!tourment) {
        throw new HttpException('Tournament not found!', HttpStatus.NOT_FOUND);
      }

      const player = await this.playerRepo.findOne({
        where: { id: player_id },
      });
      if (!player) {
        throw new HttpException('Player not found!', HttpStatus.NOT_FOUND);
      }

      await this.repo.update(id, { tourment, player });

      return { message: 'Tournament-participant updated successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to update tournament-participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.repo.delete(id);
      if (result.affected === 0) {
        throw new HttpException(
          'Tournament-participant not found!',
          HttpStatus.NOT_FOUND,
        );
      }
      return { message: 'Tournament-participant removed successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to remove tournament-participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
