import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_gangs_ranks')
export class GangRankEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'gang'})
  gangID!: number;

  @Column({name: 'rank'})
  rankPosition!: number;

  @Column()
  name!: string;

  @Column()
  commands!: string;

  @Column()
  limit!: number;
}
