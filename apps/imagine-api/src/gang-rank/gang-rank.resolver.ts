import {Resolver, Query, Args} from '@nestjs/graphql';
import {ILike, In} from 'typeorm';
import {GangRankModel} from './gang-rank.model';
import {GangRankRepository} from '../database/gang-rank.repository';
import {GangRankFilterManyInput} from './gang-rank.input';
import {GangRankEntity} from '../database/gang-rank.entity';

@Resolver(() => GangRankModel)
export class GangRankResolver {
  constructor(private readonly gangRankRepo: GangRankRepository) {}

  @Query(() => [GangRankModel])
  async gangRanks(
    @Args('filter') filter: GangRankFilterManyInput
  ): Promise<GangRankModel[]> {
    const matchingGangRanks: GangRankEntity[] = await this.gangRankRepo.find({
      where: {
        id: filter.ids && In(filter.ids),
        gangID: filter.gangIDs && In(filter.gangIDs),
        name: filter.nameSearch && ILike(`%${filter.nameSearch}%`),
      },
      skip: filter.skip,
      take: filter.limit,
    });
    return matchingGangRanks.map(GangRankModel.fromEntity);
  }
}
