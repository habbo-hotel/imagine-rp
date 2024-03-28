import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_gangs')
export class GangEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'user_id'})
  userID!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({name: 'badge_code'})
  badgeCode!: string;

  @Column({name: 'created_at'})
  createdAt!: number;
}
