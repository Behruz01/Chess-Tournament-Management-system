import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TourmentParticipantsService } from './tourment-participants.service';
import { CreateTourmentParticipantDto } from './dto/create-tourment-participant.dto';
import { UpdateTourmentParticipantDto } from './dto/update-tourment-participant.dto';
import { TourmentParticipantsEntity } from 'src/database/entities/tournamentParticipants.entity';

@ApiTags('Tourment-participants')
@ApiBearerAuth()
@Controller('tourment-participants')
export class TourmentParticipantsController {
  constructor(
    private readonly tourmentParticipantsService: TourmentParticipantsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tourment participant' })
  @ApiResponse({
    status: 201,
    description: 'The tourment participant has been successfully created.',
    type: TourmentParticipantsEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createTourmentParticipantDto: CreateTourmentParticipantDto) {
    return this.tourmentParticipantsService.create(
      createTourmentParticipantDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all tourment participants' })
  @ApiResponse({
    status: 200,
    description: 'Return all tourment participants.',
    type: [TourmentParticipantsEntity],
  })
  findAll() {
    return this.tourmentParticipantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tourment participant by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the tourment participant with the given id.',
    type: TourmentParticipantsEntity,
  })
  @ApiResponse({ status: 404, description: 'Tourment participant not found.' })
  findOne(@Param('id') id: string) {
    return this.tourmentParticipantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tourment participant by id' })
  @ApiResponse({
    status: 200,
    description: 'The tourment participant has been successfully updated.',
    type: TourmentParticipantsEntity,
  })
  @ApiResponse({ status: 404, description: 'Tourment participant not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTourmentParticipantDto: UpdateTourmentParticipantDto,
  ) {
    return this.tourmentParticipantsService.update(
      id,
      updateTourmentParticipantDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tourment participant by id' })
  @ApiResponse({
    status: 200,
    description: 'The tourment participant has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Tourment participant not found.' })
  remove(@Param('id') id: string) {
    return this.tourmentParticipantsService.remove(id);
  }
}
