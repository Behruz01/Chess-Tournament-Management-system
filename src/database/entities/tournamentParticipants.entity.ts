import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TourmentEntity } from './tourment.entity';
import { PlayersEntity } from './players.entity';

@Entity({ name: 'tourmentParticipants' })
export class TourmentParticipantsEntity extends BaseEntity {
  @ManyToOne(() => TourmentEntity, (tourment) => tourment.tourmentParticipants)
  tourment: TourmentEntity;

  @ManyToOne(() => PlayersEntity, (player) => player.tourmentParticipants)
  player: PlayersEntity;
}
