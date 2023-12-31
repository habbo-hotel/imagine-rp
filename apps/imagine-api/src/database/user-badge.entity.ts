import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user_badges')
export class UserBadgeEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'user_id'})
  userID!: number;

  @Column({name: 'badge_slot'})
  slotID!: number;

  @Column({name: 'badge_id'})
  badgeCode!: string;
}
