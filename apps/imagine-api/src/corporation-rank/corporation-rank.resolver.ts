import { Resolver, Query, Args } from '@nestjs/graphql';
import { ILike, In } from 'typeorm';
import { CorporationRankModel } from './corporation-rank.model';
import { CorporationRankRepository } from '../database/corporation-rank.repository';
import { CorporationRankFilterManyInput } from './corporation-rank.input';
import { CorporationRankEntity } from '../database/corporation-rank.entity';

@Resolver(() => CorporationRankModel)
export class CorporationRankResolver {
  constructor(
    private readonly corporationRankRepo: CorporationRankRepository
  ) { }

  @Query(() => [CorporationRankModel])
  async corporationRanks(
    @Args('filter') filter: CorporationRankFilterManyInput
  ): Promise<CorporationRankModel[]> {
    const matchingCorporationRanks: CorporationRankEntity[] =
      await this.corporationRankRepo.find({
        where: {
          corporationID: filter.corporationIDs && In(filter.corporationIDs),
          corporationRankID: filter.corporationRankID && In(filter.corporationRankID),
          name: filter.nameSearch && ILike(`%${filter.nameSearch}%`),
        },
        skip: filter.skip,
        take: filter.limit,
      });
    return matchingCorporationRanks.map(CorporationRankModel.fromEntity);
  }
}
