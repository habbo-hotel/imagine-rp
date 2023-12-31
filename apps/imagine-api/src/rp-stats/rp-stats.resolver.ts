import {Resolver, Query, Args} from '@nestjs/graphql';
import {In} from 'typeorm';
import {RPStatsModel} from './rp-stats.model';
import {RPStatsRepository} from '../database/rp-stats.repository';
import {RPStatsEntity} from '../database/rp-stats.entity';
import {RPStatsFilterManyInput, RPStatsFilterOneInput} from './rp-stats.input';

@Resolver(() => RPStatsModel)
export class RPStatsResolver {
  constructor(private readonly rpStatsRepo: RPStatsRepository) {}

  @Query(() => RPStatsModel)
  async rpStat(
    @Args('filter') filter: RPStatsFilterOneInput
  ): Promise<RPStatsModel> {
    const matchingRPStat: RPStatsEntity = await this.rpStatsRepo.findOneOrFail({
      userID: filter.userID,
    });
    return RPStatsModel.fromEntity(matchingRPStat);
  }

  @Query(() => [RPStatsModel])
  async rpStats(
    @Args('filter') filter: RPStatsFilterManyInput
  ): Promise<RPStatsModel[]> {
    const matchingRPStats: RPStatsEntity[] = await this.rpStatsRepo.find({
      where: {
        userID: filter.userIDs && In(filter.userIDs),
      },
      skip: filter.skip,
      take: filter.limit,
    });
    return matchingRPStats.map(RPStatsModel.fromEntity);
  }
}
