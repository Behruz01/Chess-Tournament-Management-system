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
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LeaderboardsService } from './leaderboards.service';
import { CreateLeaderboardDto } from './dto/create-leaderboard.dto';
import { UpdateLeaderboardDto } from './dto/update-leaderboard.dto';
import { LeaderboardEntity } from 'src/database/entities/leaderboard.entity';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Leaderboards')
@ApiBearerAuth()
@Controller('leaderboards')
export class LeaderboardsController {
  constructor(private readonly leaderboardsService: LeaderboardsService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new leaderboard' })
  @ApiResponse({
    status: 201,
    description: 'The leaderboard has been successfully created.',
    type: LeaderboardEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createLeaderboardDto: CreateLeaderboardDto) {
    return this.leaderboardsService.generateLeaderboard(createLeaderboardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leaderboards' })
  @ApiResponse({
    status: 200,
    description: 'Return all leaderboards.',
    type: [LeaderboardEntity],
  })
  findAll() {
    return this.leaderboardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a leaderboard by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the leaderboard with the given id.',
    type: LeaderboardEntity,
  })
  @ApiResponse({ status: 404, description: 'Leaderboard not found.' })
  findOne(@Param('id') id: string) {
    return this.leaderboardsService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a leaderboard by id' })
  @ApiResponse({
    status: 200,
    description: 'The leaderboard has been successfully updated.',
    type: LeaderboardEntity,
  })
  @ApiResponse({ status: 404, description: 'Leaderboard not found.' })
  update(
    @Param('id') id: string,
    @Body() updateLeaderboardDto: UpdateLeaderboardDto,
  ) {
    return this.leaderboardsService.update(id, updateLeaderboardDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a leaderboard by id' })
  @ApiResponse({
    status: 200,
    description: 'The leaderboard has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Leaderboard not found.' })
  remove(@Param('id') id: string) {
    return this.leaderboardsService.remove(id);
  }
}
