import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rp_corporations_positions')
export class CorporationRankEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'order_id' })
  orderID!: number;

  @Column({ name: 'guild_id' })
  groupID!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ name: 'salary' })
  salary!: number;
}
