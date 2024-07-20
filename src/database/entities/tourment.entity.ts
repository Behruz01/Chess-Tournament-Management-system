import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TourmentParticipantsEntity } from './tournamentParticipants.entity';
import { MatchsEntity } from './match.entity';
import { LeaderboardEntity } from './leaderboard.entity';

@Entity({ name: 'tourments' })
export class TourmentEntity extends BaseEntity {
  @Column()
  tourment_name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @OneToMany(
    () => TourmentParticipantsEntity,
    (tourmentParticipants) => tourmentParticipants.tourment,
  )
  tourmentParticipants: TourmentParticipantsEntity[];

  @OneToMany(() => MatchsEntity, (matchs) => matchs.tourment)
  matchs: MatchsEntity[];

  @OneToMany(() => LeaderboardEntity, (leaderBoard) => leaderBoard.tourment)
  leaderboards: LeaderboardEntity[];
}
