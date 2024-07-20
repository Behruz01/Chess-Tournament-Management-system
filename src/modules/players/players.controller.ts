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
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersEntity } from 'src/database/entities/players.entity';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Players')
@ApiBearerAuth()
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({
    status: 201,
    description: 'The player has been successfully created.',
    type: PlayersEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({
    status: 200,
    description: 'Return all players.',
    type: [PlayersEntity],
  })
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a player by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the player with the given id.',
    type: PlayersEntity,
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a player by id' })
  @ApiResponse({
    status: 200,
    description: 'The player has been successfully updated.',
    type: PlayersEntity,
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player by id' })
  @ApiResponse({
    status: 200,
    description: 'The player has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
