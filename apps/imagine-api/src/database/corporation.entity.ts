import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('rp_jobs')
export class CorporationEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({name: 'desc'})
  description!: string;

  @Column({name: 'badge'})
  badgeCode!: string;

  @Column({name: 'owner_id'})
  userID!: number;

  @Column({name: 'created'})
  createdAt!: number;
}
