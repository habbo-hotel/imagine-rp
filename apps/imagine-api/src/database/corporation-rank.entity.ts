import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rp_jobs_ranks')
export class CorporationRankEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'gang' })
  corporationID!: number;

  @Column({ name: 'rank' })
  rankPosition!: number;

  @Column()
  name!: string;

  @Column()
  pay!: string;
}