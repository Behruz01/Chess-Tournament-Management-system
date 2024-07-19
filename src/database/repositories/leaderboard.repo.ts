import { Repository } from 'typeorm';
import { LeaderboardEntity } from '../entities/leaderboard.entity';

export type LeaderboardRepo = Repository<LeaderboardEntity>;
