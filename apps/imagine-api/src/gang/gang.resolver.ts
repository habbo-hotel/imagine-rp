import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {GangModel} from './gang.model';
import {
  GangCreateInput,
  GangFilterManyInput,
  GangFilterOneInput,
  GangUpdateInput,
} from './gang.input';
import {GetUser} from '../session/get-user.decorator';
import {UserEntity} from '../database/user.entity';
import {GangRepository} from '../database/gang.repository';
import {UnauthorizedException} from '@nestjs/common';
import {ILike, In} from 'typeorm';
import {GangEntity} from '../database/gang.entity';
import DayJS from 'dayjs';
import {UserModel} from '../user/user.model';
import {UserRepository} from '../database/user.repository';

@Resolver(() => GangModel)
export class GangResolver {
  constructor(
    private readonly gangRepo: GangRepository,
    private readonly userRepo: UserRepository
  ) {}

  @ResolveField(() => UserModel, {nullable: true})
  async user(@Parent() parent: GangModel): Promise<UserModel> {
    const matchingUser = await this.userRepo.findOneOrFail({id: parent.userID});
    return UserModel.fromEntity(matchingUser);
  }

  @Query(() => [GangModel])
  async gangs(
    @Args('filter') filter: GangFilterManyInput
  ): Promise<GangModel[]> {
    const matchingGangs: GangEntity[] = await this.gangRepo.find({
      where: {
        id: filter.ids && In(filter.ids),
        name: filter.nameContains && ILike(`%${filter.nameContains}%`),
      },
      skip: filter.skip,
      take: filter.limit,
    });
    return matchingGangs.map(GangModel.fromEntity);
  }

  @Query(() => GangModel)
  async gang(@Args('filter') filter: GangFilterOneInput): Promise<GangModel> {
    const matchingGang = await this.gangRepo.findOneOrFail({
      id: filter.id,
    });
    return GangModel.fromEntity(matchingGang);
  }

  @Mutation(() => GangModel)
  async gangCreate(
    @Args('filter') input: GangCreateInput,
    @GetUser() session: UserEntity
  ): Promise<GangModel> {
    const createdAt = DayJS().unix();
    const newGang = await this.gangRepo.create({
      userID: session.id!,
      name: input.name,
      description: input.description,
      badgeCode: input.badgeCode,
      createdAt,
    });
    return GangModel.fromEntity(newGang);
  }

  @Mutation(() => Boolean)
  async gangUpdate(
    @Args('filter') filter: GangFilterOneInput,
    @Args('filter') input: GangUpdateInput,
    @GetUser() session: UserEntity
  ): Promise<Boolean> {
    const matchingGang: GangModel = await this.gang(filter);
    const doesUserOwnCorp: boolean = matchingGang.userID === session.id;
    if (!doesUserOwnCorp) {
      throw new UnauthorizedException();
    }
    await this.gangRepo.update({id: matchingGang.id}, input);
    return true;
  }

  @Mutation(() => Boolean)
  gangDelete(
    @Args('filter') filter: GangFilterOneInput,
    @GetUser() session: UserEntity
  ): Promise<Boolean> {
    throw new Error('not implemented');
  }
}
