import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('view_rp_stats')
export class RPStatsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'health_current' })
  healthCurrent!: number;

  @Column({ name: 'health_max' })
  healthMax!: number;

  @Column({ name: 'hunger_current' })
  hungerCurrent!: number;

  @Column({ name: 'hunger_max' })
  hungerMax!: number;

  @Column({ name: 'energy_current' })
  energyCurrent!: number;

  @Column({ name: 'energy_max' })
  energyMax!: number;

  @Column({ name: 'armor_current' })
  armorCurrent!: number;

  @Column({ name: 'armor_max' })
  armorMax!: number;

  @Column({ name: 'corp_id' })
  corporationID?: number;

  @Column({ name: 'corp_id' })
  corporationRankID?: number;

  @Column({ name: 'gang_id' })
  gangID?: number;

  @Column({ name: 'gang_rank_id' })
  gangRankID?: number;
}
