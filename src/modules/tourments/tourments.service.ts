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
    const tourment = this.repo.create(createTourmentDto);
    return this.repo.save(tourment);
  }

  async findAll(): Promise<TourmentEntity[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<TourmentEntity> {
    const tourment = await this.repo.findOne({ where: { id } });
    if (!tourment) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return tourment;
  }

  async update(
    id: string,
    updateTourmentDto: UpdateTourmentDto,
  ): Promise<Object> {
    const data = await this.repo.findOne({ where: { id } });
    if (!data)
      throw new HttpException('Data not found!', HttpStatus.BAD_REQUEST);
    const { tourment_name, start_date, end_date } = updateTourmentDto;

    await this.repo.update({ id }, { tourment_name, start_date, end_date });
    return { message: 'Tourment updated successfully' };
  }

  async remove(id: string): Promise<Object> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return { message: 'Tourment deleted successfully' };
  }
}
