import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TourmentParticipantsEntity } from './tournamentParticipants.entity';
import { MatchsEntity } from './match.entity';
import { LeaderboardEntity } from './leaderboard.entity';

@Entity({ name: 'players' })
export class PlayersEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column()
  rating: number;

  @Column()
  country: string;

  @OneToMany(
    () => TourmentParticipantsEntity,
    (tourmentParticipants) => tourmentParticipants.player,
  )
  tourmentParticipants: TourmentParticipantsEntity[];

  @OneToMany(() => MatchsEntity, (match) => match.first_player)
  matchsAsFirstPlayer: MatchsEntity[];

  @OneToMany(() => MatchsEntity, (match) => match.second_player)
  matchsAsSecondPlayer: MatchsEntity[];

  @OneToMany(() => LeaderboardEntity, (Leaderboard) => Leaderboard.player)
  leaderboards: LeaderboardEntity[];
}
