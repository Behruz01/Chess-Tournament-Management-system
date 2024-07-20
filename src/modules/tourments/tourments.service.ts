import { Injectable } from '@nestjs/common';
import { CreateTourmentDto } from './dto/create-tourment.dto';
import { UpdateTourmentDto } from './dto/update-tourment.dto';

@Injectable()
export class TourmentsService {
  create(createTourmentDto: CreateTourmentDto) {
    return 'This action adds a new tourment';
  }

  findAll() {
    return `This action returns all tourments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tourment`;
  }

  update(id: number, updateTourmentDto: UpdateTourmentDto) {
    return `This action updates a #${id} tourment`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourment`;
  }
}
