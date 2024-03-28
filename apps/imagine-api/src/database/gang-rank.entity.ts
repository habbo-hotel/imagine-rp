import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_gangs_positions')
export class GangRankEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'gang_id'})
  gangID!: number;

  @Column()
  name!: string;

  @Column()
  desciption!: string;
}
