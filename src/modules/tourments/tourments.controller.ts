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
import { TourmentsService } from './tourments.service';
import { CreateTourmentDto } from './dto/create-tourment.dto';
import { UpdateTourmentDto } from './dto/update-tourment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Tournaments')
@ApiBearerAuth()
@Controller('tournaments')
export class TourmentsController {
  constructor(private readonly tourmentsService: TourmentsService) {}

  @ApiOperation({ summary: 'Create a new tournament' })
  @ApiResponse({ status: 201, description: 'Tournament created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createTourmentDto: CreateTourmentDto) {
    return this.tourmentsService.create(createTourmentDto);
  }

  @ApiOperation({ summary: 'Get all tournaments' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  findAll() {
    return this.tourmentsService.findAll();
  }

  @ApiOperation({ summary: 'Get a tournament by ID' })
  @ApiParam({ name: 'id', description: 'Tournament ID' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourmentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a tournament by ID' })
  @ApiParam({ name: 'id', description: 'Tournament ID' })
  @ApiResponse({ status: 200, description: 'Tournament updated successfully' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTourmentDto: UpdateTourmentDto,
  ) {
    return this.tourmentsService.update(id, updateTourmentDto);
  }

  @ApiOperation({ summary: 'Delete a tournament by ID' })
  @ApiParam({ name: 'id', description: 'Tournament ID' })
  @ApiResponse({ status: 200, description: 'Tournament deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourmentsService.remove(id);
  }
}
