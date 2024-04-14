import { Column, Entity, PrimaryColumn, } from 'typeorm';

@Entity('rp_gangs')
export class GangEntity {
  @PrimaryColumn({ name: 'group_id' })
  groupID!: number;
}
