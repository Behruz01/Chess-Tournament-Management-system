import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TourmentEntity } from './tourment.entity';
import { PlayersEntity } from './players.entity';

@Entity({ name: 'matchs' })
export class MatchsEntity extends BaseEntity {
  @ManyToOne(() => TourmentEntity, (tourment) => tourment.matchs)
  tourment: TourmentEntity;

  @ManyToOne(() => PlayersEntity, (player) => player.matchsAsFirstPlayer)
  first_player: PlayersEntity;

  @ManyToOne(() => PlayersEntity, (player) => player.matchsAsSecondPlayer)
  second_player: PlayersEntity;

  @Column({ nullable: true })
  first_player_score: number;

  @Column({ nullable: true })
  second_player_score: number;

  @Column()
  round: number;
}
