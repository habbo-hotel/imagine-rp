import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { In } from 'typeorm';
import { RPStatsModel } from './rp-stats.model';
import { RPStatsRepository } from '../database/rp-stats.repository';
import { RPStatsEntity } from '../database/rp-stats.entity';
import { RPStatsFilterManyInput, RPStatsFilterOneInput } from './rp-stats.input';
import { GangRepository } from '../database/gang.repository';
import { CorporationRepository } from '../database/corporation.repository';
import { GangModel } from '../gang/gang.model';
import { CorporationModel } from '../corporation/corporation.model';
import { CorporationRankModel } from '../corporation-rank/corporation-rank.model';
import { CorporationRankRepository } from '../database/corporation-rank.repository';

@Resolver(() => RPStatsModel)
export class RPStatsResolver {
  constructor(
    private readonly rpStatsRepo: RPStatsRepository,
    private readonly gangRepo: GangRepository,
    private readonly corporationRepo: CorporationRepository,
    private readonly corporationRankRepo: CorporationRankRepository
  ) { }

  @ResolveField(() => GangModel, { nullable: true })
  async gang(@Parent() { gangID }: RPStatsEntity): Promise<GangModel> {
    const matchingGang = await this.gangRepo.findOneOrFail({ groupID: gangID });
    return GangModel.fromEntity(matchingGang);
  }

  @ResolveField(() => CorporationModel, { nullable: true })
  async corporation(
    @Parent() { corporationID }: RPStatsEntity
  ): Promise<CorporationModel> {
    const matchingCorp = await this.corporationRepo.findOneOrFail({
      groupID: corporationID,
    });
    return CorporationModel.fromEntity(matchingCorp);
  }

  @ResolveField(() => CorporationRankModel, { nullable: true })
  async corporationRank(
    @Parent() { corporationID, corporationPositionID: corporationRankID }: RPStatsEntity
  ): Promise<CorporationRankModel> {
    const matchingCorpRank = await this.corporationRankRepo.findOneOrFail({
      groupID: corporationID,
      id: corporationRankID,
    });
    return CorporationRankModel.fromEntity(matchingCorpRank);
  }

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
      order: {
        id: 'DESC',
      },
      skip: filter.skip,
      take: filter.limit,
    });
    return matchingRPStats.map(RPStatsModel.fromEntity);
  }
}
