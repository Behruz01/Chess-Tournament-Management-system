import { Repository } from 'typeorm';
import { TourmentParticipantsEntity } from './../entities/tournamentParticipants.entity';

export type TourmentParticipantRepo = Repository<TourmentParticipantsEntity>;
