import {
  Resolver,
  Query,
  Args,
} from '@nestjs/graphql';
import { CorporationMemberModel } from './corporation-member.model';
import { CorporationMemberFilterManyInput } from './corporation-member.input';
import { RPStatsRepository } from '../database/rp-stats.repository';
import { In } from 'typeorm';

@Resolver(() => CorporationMemberModel)
export class CorporationMemberResolver {

  constructor(private readonly rpStatsRepo: RPStatsRepository) { }

  @Query(() => [CorporationMemberModel])
  async corporationMembers(@Args('filter') filter: CorporationMemberFilterManyInput): Promise<CorporationMemberModel[]> {
    const matchingUsersByStats = await this.rpStatsRepo.find({
      where: {
        userID: filter.userIDs && In(filter.userIDs),
        corporationID: filter.corporationIDs && In(filter.corporationIDs),
      },
    });
    return matchingUsersByStats.map(CorporationMemberModel.fromRPStatsEntity);
  }

}
