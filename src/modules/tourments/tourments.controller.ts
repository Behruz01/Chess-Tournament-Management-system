import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourmentsService } from './tourments.service';
import { CreateTourmentDto } from './dto/create-tourment.dto';
import { UpdateTourmentDto } from './dto/update-tourment.dto';

@Controller('tourments')
export class TourmentsController {
  constructor(private readonly tourmentsService: TourmentsService) {}

  @Post()
  create(@Body() createTourmentDto: CreateTourmentDto) {
    return this.tourmentsService.create(createTourmentDto);
  }

  @Get()
  findAll() {
    return this.tourmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourmentDto: UpdateTourmentDto) {
    return this.tourmentsService.update(+id, updateTourmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourmentsService.remove(+id);
  }
}
