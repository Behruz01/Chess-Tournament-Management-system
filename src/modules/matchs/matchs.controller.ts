import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { MatchsService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchsEntity } from 'src/database/entities/match.entity';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Matches')
@ApiBearerAuth()
@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new match' })
  @ApiResponse({
    status: 201,
    description: 'The match has been successfully created.',
    type: MatchsEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchsService.generateSwissPairings(createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all matches' })
  @ApiResponse({
    status: 200,
    description: 'Return all matches.',
    type: [MatchsEntity],
  })
  findAll() {
    return this.matchsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a match by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the match with the given id.',
    type: MatchsEntity,
  })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  findOne(@Param('id') id: string) {
    return this.matchsService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a match by id' })
  @ApiResponse({
    status: 200,
    description: 'The match has been successfully updated.',
    type: MatchsEntity,
  })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchsService.update(id, updateMatchDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a match by id' })
  @ApiResponse({
    status: 200,
    description: 'The match has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  remove(@Param('id') id: string) {
    return this.matchsService.remove(id);
  }
}
