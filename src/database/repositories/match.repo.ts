import { Repository } from 'typeorm';
import { MatchsEntity } from '../entities/match.entity';

export type MatchRepo = Repository<MatchsEntity>;
