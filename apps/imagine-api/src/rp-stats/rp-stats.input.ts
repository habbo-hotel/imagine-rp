import {Field, InputType} from '@nestjs/graphql';
import {Max} from 'class-validator';
import {GLOBAL_MAX_RESOURCE_LIMIT} from '../imagine.constant';

export enum RPStatsOrderBy {
  KILLS_TOTAL = 'killsTotal',
  KILLS_FIST_TOTAL = 'killsFistTotal',
  KILLS_MELEE_TOTAL = 'killsMeleeTotal',
  KILLS_BOMB_TOTAL = 'killsBombTotal',
  KILLS_GUNG_TOTAL = 'killsGunTotal',
  DEATHS_TOTAL = 'deathsTotal',
  TIMES_ARRESTED_TOTAL = 'timesArrestedTotal',
  ARRESTS_TOTAL = 'arrestsTotal',
  SUCCESSFUL_EVASIONS_TOTAL = 'successfulEvasionsTotal',
}

@InputType()
export class RPStatsFilterOneInput {
  @Field(() => Number)
  userID!: number;
}

@InputType()
export class RPStatsFilterManyInput {
  @Field(() => [Number], {nullable: true})
  userIDs?: number[];

  @Field(() => Number, {nullable: true})
  skip?: number;

  @Field(() => Number, {nullable: true})
  @Max(GLOBAL_MAX_RESOURCE_LIMIT)
  limit?: number;

  @Field(() => RPStatsOrderBy, {nullable: true})
  orderBy?: RPStatsOrderBy;
}
