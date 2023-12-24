import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {CorporationModel} from './corporation.model';
import {
  CorporationCreateInput,
  CorporationFilterManyInput,
  CorporationFilterOneInput,
  CorporationUpdateInput,
} from './corporation.input';
import {GetUser} from '../session/get-user.decorator';
import {UserEntity} from '../database/user.entity';
import {CorporationRepository} from '../database/corporation.repository';
import {UnauthorizedException} from '@nestjs/common';
import {ILike, In} from 'typeorm';
import {CorporationEntity} from '../database/corporation.entity';
import DayJS from 'dayjs';

@Resolver(() => CorporationModel)
export class CorporationResolver {
  constructor(private readonly corporationRepo: CorporationRepository) {}

  @Query(() => [CorporationModel])
  async corporations(
    @Args('filter') filter: CorporationFilterManyInput
  ): Promise<CorporationModel[]> {
    const matchingCorporations: CorporationEntity[] =
      await this.corporationRepo.find({
        where: {
          id: filter.ids && In(filter.ids),
          name: filter.nameContains && ILike(`%${filter.nameContains}%`),
        },
        skip: filter.skip,
        take: filter.limit,
      });
    return matchingCorporations.map(CorporationModel.fromEntity);
  }

  @Query(() => CorporationModel)
  async corporation(
    @Args('filter') filter: CorporationFilterOneInput
  ): Promise<CorporationModel> {
    const matchingCorporation = await this.corporationRepo.findOneOrFail({
      id: filter.id,
    });
    return CorporationModel.fromEntity(matchingCorporation);
  }

  @Mutation(() => CorporationModel)
  async corporationCreate(
    @Args('filter') input: CorporationCreateInput,
    @GetUser() session: UserEntity
  ): Promise<CorporationModel> {
    const createdAt = DayJS().unix();
    const newCorporation = await this.corporationRepo.create({
      userID: session.id!,
      name: input.name,
      description: input.description,
      badgeCode: input.badgeCode,
      createdAt,
    });
    return CorporationModel.fromEntity(newCorporation);
  }

  @Mutation(() => Boolean)
  async corporationUpdate(
    @Args('filter') filter: CorporationFilterOneInput,
    @Args('filter') input: CorporationUpdateInput,
    @GetUser() session: UserEntity
  ): Promise<Boolean> {
    const matchingCorporation: CorporationModel = await this.corporation(
      filter
    );
    const doesUserOwnCorp: boolean = matchingCorporation.userID === session.id;
    if (!doesUserOwnCorp) {
      throw new UnauthorizedException();
    }
    await this.corporationRepo.update({id: matchingCorporation.id}, input);
    return true;
  }

  @Mutation(() => Boolean)
  corporationDelete(
    @Args('filter') filter: CorporationFilterOneInput,
    @GetUser() session: UserEntity
  ): Promise<Boolean> {
    throw new Error('not implemented');
  }
}
