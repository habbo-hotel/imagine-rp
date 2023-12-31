import {Resolver, Query, Args} from '@nestjs/graphql';
import {GangMemberModel} from './gang-member.model';
import {GangMemberFilterManyInput} from './gang-member.input';
import {RPStatsRepository} from '../database/rp-stats.repository';
import {In} from 'typeorm';

@Resolver(() => GangMemberModel)
export class GangMemberResolver {
  constructor(private readonly rpStatsRepo: RPStatsRepository) {}

  @Query(() => [GangMemberModel])
  async gangMembers(
    @Args('filter') filter: GangMemberFilterManyInput
  ): Promise<GangMemberModel[]> {
    const matchingUsersByStats = await this.rpStatsRepo.find({
      where: {
        userID: filter.userIDs && In(filter.userIDs),
        gangID: filter.gangIDs && In(filter.gangIDs),
      },
    });
    return matchingUsersByStats.map(GangMemberModel.fromRPStatsEntity);
  }
}
