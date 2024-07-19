import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
