import { Column, Entity, PrimaryGeneratedColumn, Generated } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMPTZ',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMPTZ',
  })
  updatedAt: Date;

  constructor() {
    this.id = uuidv4();
  }
}
