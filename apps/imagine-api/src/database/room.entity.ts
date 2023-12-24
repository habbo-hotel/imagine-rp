import { UserEntity } from './user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'caption' })
  name!: string;

  @Column()
  description!: string;

  @Column({ name: 'owner' })
  userID!: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner' })
  user?: UserEntity;

  @Column({ name: 'users' })
  usersNow!: number;

  @Column({ name: 'users_max' })
  usersMax!: number;
}
