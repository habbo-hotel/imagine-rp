import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('view_rp_stats')
export class RPStatsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name: 'health_current'})
  healthCurrent!: number;

  @Column({name: 'health_max'})
  healthMax!: number;

  @Column({name: 'hunger_current'})
  hungerCurrent!: number;

  @Column({name: 'hunger_max'})
  hungerMax!: number;

  @Column({name: 'energy_current'})
  energyCurrent!: number;

  @Column({name: 'energy_max'})
  energyMax!: number;

  @Column({name: 'armor_current'})
  armorCurrent!: number;

  @Column({name: 'armor_max'})
  armorMax!: number;

  @Column({name: 'corp_id'})
  corporationID!: number;

  @Column({name: 'corp_id'})
  corporationRankID!: number;

  @Column({name: 'gang_id'})
  gangID!: number;

  @Column({name: 'gang_rank_id'})
  gangRankID!: number;

  @Column({name: 'kill_death_ratio'})
  killDeathRatio!: number;

  @Column({name: 'kills_total'})
  killsTotal!: number;

  @Column({name: 'kills_fist'})
  killsFistTotal!: number;

  @Column({name: 'kills_melee'})
  killsMeleeTotal!: number;

  @Column({name: 'kills_bomb'})
  killsBombTotal!: number;

  @Column({name: 'kills_gun'})
  killsGunTotal!: number;

  @Column({name: 'deaths_total'})
  deathsTotal!: number;

  @Column({name: 'times_arrested_total'})
  timesArrestedTotal!: number;

  @Column({name: 'arrests_total'})
  arrestsTotal!: number;

  @Column({name: 'successful_evasions_total'})
  successfulEvasionsTotal!: number;
}
