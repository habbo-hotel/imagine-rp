import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_corporations')
export class CorporationEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'user_id'})
  userID!: number;

  @Column({name: 'room_id'})
  roomID!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({name: 'badge_code'})
  badgeCode!: string;
  
  @Column({name: 'tags'})
  tags!: string;
  
  @Column({name: 'created_at'})
  createdAt!: number;
}
