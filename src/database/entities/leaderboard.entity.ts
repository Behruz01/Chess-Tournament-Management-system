import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TourmentEntity } from './tourment.entity';
import { PlayersEntity } from './players.entity';

@Entity({ name: 'leaderboard' })
export class LeaderboardEntity extends BaseEntity {
  @ManyToOne(() => TourmentEntity, (tourment) => tourment.leaderboards)
  tourment: TourmentEntity;

  @ManyToOne(() => PlayersEntity, (player) => player.leaderboards)
  player: PlayersEntity;

  @Column()
  rank: number;

  @Column()
  points: number;
}
