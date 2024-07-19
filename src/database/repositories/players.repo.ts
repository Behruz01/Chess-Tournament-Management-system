import { Repository } from 'typeorm';
import { PlayersEntity } from '../entities/players.entity';

export type PlayerRepo = Repository<PlayersEntity>;
