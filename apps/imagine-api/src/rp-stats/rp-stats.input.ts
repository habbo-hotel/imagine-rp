import {Field, InputType} from '@nestjs/graphql';
import {Max} from 'class-validator';
import {GLOBAL_MAX_RESOURCE_LIMIT} from '../imagine.constant';

export enum RPStatsOrderBy {
  killDeathRatio = 'killDeathRatio',
  killsTotal = 'killsTotal',
  killsFistTotal = 'killsFistTotal',
  killsMeleeTotal = 'killsMeleeTotal',
  killsBombTotal = 'killsBombTotal',
  killsGunTotal = 'killsGunTotal',
  deathsTotal = 'deathsTotal',
  timesArrestedTotal = 'timesArrestedTotal',
  arrestsTotal = 'arrestsTotal',
  successfulEvasionsTotal = 'successfulEvasionsTotal',
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
