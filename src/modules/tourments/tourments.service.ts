import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTourmentDto } from './dto/create-tourment.dto';
import { UpdateTourmentDto } from './dto/update-tourment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TourmentEntity } from 'src/database/entities/tourment.entity';
import { TourmentRepo } from 'src/database/repositories/tourment.repo';

@Injectable()
export class TourmentsService {
  constructor(
    @InjectRepository(TourmentEntity) private readonly repo: TourmentRepo,
  ) {}

  async create(createTourmentDto: CreateTourmentDto): Promise<TourmentEntity> {
    try {
      const tourment = this.repo.create(createTourmentDto);
      return await this.repo.save(tourment);
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

  async findAll(): Promise<TourmentEntity[]> {
    try {
      return await this.repo.find();
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

  async findOne(id: string): Promise<TourmentEntity> {
    try {
      const tourment = await this.repo.findOne({ where: { id } });
      if (!tourment) {
        throw new NotFoundException(`Tournament with ID ${id} not found`);
      }
      return tourment;
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

  async update(
    id: string,
    updateTourmentDto: UpdateTourmentDto,
  ): Promise<{ message: string }> {
    try {
      const existingTourment = await this.repo.findOne({ where: { id } });
      if (!existingTourment) {
        throw new NotFoundException(`Tournament with ID ${id} not found`);
      }

      const { tourment_name, start_date, end_date } = updateTourmentDto;
      await this.repo.update({ id }, { tourment_name, start_date, end_date });

      return { message: 'Tournament updated successfully' };
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

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.repo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Tournament with ID ${id} not found`);
      }
      return { message: 'Tournament deleted successfully' };
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
}
