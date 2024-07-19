import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

export type UsersRepo = Repository<UsersEntity>;
