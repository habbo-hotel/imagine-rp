import {Field, ObjectType} from '@nestjs/graphql';
import {RPStatsEntity} from '../database/rp-stats.entity';

@ObjectType()
export class RPStatsModel {
  @Field(() => Number, {nullable: true})
  userID!: number;

  @Field(() => Number, {nullable: true})
  healthCurrent!: number;

  @Field(() => Number, {nullable: true})
  healthMax!: number;

  @Field(() => Number, {nullable: true})
  hungerCurrent!: number;

  @Field(() => Number, {nullable: true})
  hungerMax!: number;

  @Field(() => Number, {nullable: true})
  energyCurrent!: number;

  @Field(() => Number, {nullable: true})
  energyMax!: number;

  @Field(() => Number, {nullable: true})
  armorCurrent!: number;

  @Field(() => Number, {nullable: true})
  armorMax!: number;

  @Field(() => Number, {nullable: true})
  corporationID?: number;

  @Field(() => Number, {nullable: true})
  corporationRankID?: number;

  @Field(() => Number, {nullable: true})
  gangID?: number;

  @Field(() => Number, {nullable: true})
  gangRankID?: number;

  @Field(() => Number, {nullable: true})
  killDeathRatio!: number;

  @Field(() => Number, {nullable: true})
  killsTotal!: number;

  @Field(() => Number, {nullable: true})
  killsFistTotal!: number;

  @Field(() => Number, {nullable: true})
  killsMeleeTotal!: number;

  @Field(() => Number, {nullable: true})
  killsBombTotal!: number;

  @Field(() => Number, {nullable: true})
  killsGunTotal!: number;

  @Field(() => Number, {nullable: true})
  deathsTotal!: number;

  @Field(() => Number, {nullable: true})
  timesArrestedTotal!: number;

  @Field(() => Number, {nullable: true})
  arrestsTotal!: number;

  @Field(() => Number, {nullable: true})
  successfulEvasionsTotal!: number;

  static fromEntity(entity: RPStatsEntity): RPStatsModel {
    return {
      userID: entity.id,
      healthCurrent: entity.healthCurrent,
      healthMax: entity.healthMax,
      hungerCurrent: entity.hungerCurrent,
      hungerMax: entity.hungerMax,
      energyCurrent: entity.energyCurrent,
      energyMax: entity.energyMax,
      armorCurrent: entity.armorCurrent,
      armorMax: entity.armorMax,
      corporationID: entity.corporationID!,
      corporationRankID: entity.corporationRankID,
      gangID: entity.gangID,
      gangRankID: entity.gangRankID,
      killDeathRatio: entity.killDeathRatio,
      killsTotal: entity.killsTotal,
      killsFistTotal: entity.killsFistTotal,
      killsMeleeTotal: entity.killsMeleeTotal,
      killsGunTotal: entity.killsGunTotal,
      killsBombTotal: entity.killsBombTotal,
      deathsTotal: entity.deathsTotal,
      timesArrestedTotal: entity.timesArrestedTotal,
      arrestsTotal: entity.timesArrestedTotal,
      successfulEvasionsTotal: entity.successfulEvasionsTotal,
    };
  }
}
