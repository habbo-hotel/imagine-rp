import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('rp_corporations')
export class CorporationEntity {
  @PrimaryColumn({ name: 'guild_id' })
  groupID!: number;

  @Column({ name: 'tags' })
  tags!: string;
}
