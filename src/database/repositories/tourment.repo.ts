import { Repository } from 'typeorm';
import { TourmentEntity } from '../entities/tourment.entity';

export type TourmentRepo = Repository<TourmentEntity>;
