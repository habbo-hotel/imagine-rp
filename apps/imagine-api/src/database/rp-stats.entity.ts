import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_users_stats')
export class RPStatsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id', unique: true })
  userID!: number;

  @Column({name: 'current_health'})
  healthCurrent!: number;

  @Column({name: 'maximum_health'})
  healthMax!: number;

  @Column({name: 'corporation_id'})
  corporationID!: number;

  @Column({name: 'corporation_position_id'})
  corporationPositionID!: number;

  @Column({name: 'gang_id'})
  gangID!: number;

  @Column({name: 'gang_position_id'})
  gangPositionID!: number;
}
