import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersEntity } from 'src/database/entities/players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayersEntity])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
