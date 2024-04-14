import { Field, ObjectType } from '@nestjs/graphql';
import { RPStatsEntity } from '../database/rp-stats.entity';

@ObjectType()
export class RPStatsModel {
  @Field(() => Number, { nullable: true })
  userID!: number;

  @Field(() => Number, { nullable: true })
  healthCurrent!: number;

  @Field(() => Number, { nullable: true })
  healthMax!: number;

  @Field(() => Number, { nullable: true })
  corporationID?: number;

  @Field(() => Number, { nullable: true })
  corporationRankID?: number;

  @Field(() => Number, { nullable: true })
  gangID?: number;

  static fromEntity(entity: RPStatsEntity): RPStatsModel {
    return {
      userID: entity.id,
      healthCurrent: entity.healthCurrent,
      healthMax: entity.healthMax,
      corporationID: entity.corporationID!,
      corporationRankID: entity.corporationPositionID,
      gangID: entity.gangID,
    };
  }
}
