import {UserEntity} from './user.entity';
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

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({name: 'owner_id'})
  userID!: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'owner_id'})
  user?: UserEntity;

  @Column({name: 'users'})
  usersNow!: number;

  @Column({name: 'users_max'})
  usersMax!: number;

  static fromEntity(entity: RoomEntity) {
    return {
      id: entity.id!,
      name: entity.name,
      description: entity.description,
      userID: entity.userID,
      usersNow: entity.usersNow,
      usersMax: entity.usersMax,
    };
  }
}
