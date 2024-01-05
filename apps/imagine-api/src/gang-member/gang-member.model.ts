import {Field, ObjectType} from '@nestjs/graphql';
import {RPStatsEntity} from '../database/rp-stats.entity';

@ObjectType()
export class GangMemberModel {
  @Field(() => Number, {nullable: true})
  gangID!: number;

  @Field(() => Number, {nullable: true})
  gangRankID!: number;

  @Field(() => Number, {nullable: true})
  userID!: number;

  static fromRPStatsEntity(rpStatsEntity: RPStatsEntity): GangMemberModel {
    return {
      gangID: rpStatsEntity.gangID!,
      gangRankID: rpStatsEntity.gangRankID!,
      userID: rpStatsEntity.id,
    };
  }
}
