import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersEntity } from 'src/database/entities/players.entity';
import { PlayerRepo } from 'src/database/repositories/players.repo';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayersEntity) private readonly repo: PlayerRepo,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      const newPlayer = this.repo.create(createPlayerDto);
      await this.repo.save(newPlayer);
      return { message: 'Player created successfully', player: newPlayer };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while creating the player',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const players = await this.repo.find();
      return players;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while fetching players',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const player = await this.repo.findOne({ where: { id } });
      if (!player) {
        throw new HttpException('Player not found!', HttpStatus.NOT_FOUND);
      }
      return player;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while fetching the player',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    try {
      const player = await this.repo.findOne({ where: { id } });
      if (!player) {
        throw new HttpException('Player not found!', HttpStatus.NOT_FOUND);
      }
      const { player_name, birthday, country, rating, points } =
        updatePlayerDto;
      const updatedPlayer = await this.repo.update(
        { id },
        { player_name, birthday, country, rating, points },
      );
      return { message: 'Player updated successfully', player: updatedPlayer };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while updating the player',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const player = await this.repo.findOne({ where: { id } });
      if (!player) {
        throw new HttpException('Player not found!', HttpStatus.NOT_FOUND);
      }
      await this.repo.delete(id);
      return { message: 'Player removed successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while removing the player',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
