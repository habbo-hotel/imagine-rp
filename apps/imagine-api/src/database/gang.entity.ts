import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rp_gangs')
export class GangEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string

  @Column({ name: 'desc' })
  description!: string;

  @Column({ name: 'badge' })
  badgeCode!: string;

  @Column({ name: 'owner_id' })
  userID!: number;

  @Column({ name: 'created' })
  createdAt!: number;
}