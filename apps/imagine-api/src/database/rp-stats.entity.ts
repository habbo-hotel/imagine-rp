import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_stats')
export class RPStatsEntity {
  @PrimaryColumn({name: 'id'})
  userID!: number;

  @Column()
  health!: number;

  @Column()
  energy!: number;

  @Column()
  hunger!: number;

  @Column()
  armor!: number;

  @Column({name: 'corporation_id'})
  corporationID!: number;

  @Column({name: 'corporation_rank_id'})
  corporationRankID!: number;

  @Column({name: 'gang_id'})
  gangID!: number;

  @Column({name: 'gang_rank_id'})
  gangRankID!: number;
}
