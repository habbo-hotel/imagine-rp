import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_jobs_ranks')
export class CorporationRankEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'job'})
  corporationID!: number;

  @Column({name: 'rank'})
  corporationRankID!: number;

  @Column()
  name!: string;

  @Column()
  pay!: string;
}
