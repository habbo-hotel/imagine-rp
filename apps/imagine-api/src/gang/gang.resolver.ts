import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GangModel } from './gang.model';
import {
  GangCreateInput,
  GangFilterManyInput,
  GangFilterOneInput,
  GangUpdateInput,
} from './gang.input';
import { GetUser } from '../session/get-user.decorator';
import { UserEntity } from '../database/user.entity';
import { GangRepository } from '../database/gang.repository';
import { UnauthorizedException } from '@nestjs/common';
import { ILike, In } from 'typeorm';
import { GangEntity } from '../database/gang.entity';
import DayJS from 'dayjs';
import { UserModel } from '../user/user.model';
import { UserRepository } from '../database/user.repository';
import { GroupRepository } from '../database/group.repository';
import { RoomRepository } from '../database/room.repository';
import { GroupEntity } from '../database/group.entity';

@Resolver(() => GangModel)
export class GangResolver {
  constructor(
    private readonly roomRepo: RoomRepository,
    private readonly gangRepo: GangRepository,
    private readonly userRepo: UserRepository,
    private readonly groupRepo: GroupRepository,
  ) { }

  @ResolveField(() => UserModel, { nullable: true })
  async user(@Parent() parent: GangModel): Promise<UserModel> {
    const matchingUser = await this.userRepo.findOneOrFail({ id: parent.groupID });
    return UserModel.fromEntity(matchingUser);
  }

  @Query(() => [GangModel])
  async gangs(
    @Args('filter') filter: GangFilterManyInput
  ): Promise<GangModel[]> {
    const matchingGroups: GroupEntity[] =
      await this.groupRepo.find({
        where: {
          id: filter.ids && In(filter.ids),
          name: filter.nameContains && ILike(`%${filter.nameContains}%`),
        },
        skip: filter.skip,
        take: filter.limit,
      });
    if (!matchingGroups) {
      return [];
    }
    const matchingGangs: GangEntity[] = await this.gangRepo.find({
      where: {
        groupID: In(matchingGroups.map(_ => _.id))
      }
    })
    return matchingGangs.map(GangModel.fromEntity);
  }

  @Query(() => GangModel)
  async gang(@Args('filter') filter: GangFilterOneInput): Promise<GangModel> {
    const matchingGang = await this.gangRepo.findOneOrFail({
      groupID: filter.id,
    });
    return GangModel.fromEntity(matchingGang);
  }

  @Mutation(() => GangModel)
  async gangCreate(
    @Args('filter') input: GangCreateInput,
    @GetUser() session: UserEntity
  ): Promise<GangModel> {
    await this.userOwnsRoom(session, input.roomID);
    if (input.roomID) {
      await this.userOwnsRoom(session, input.roomID);
    }
    const createdAt = DayJS().unix();
    const newGroup = await this.groupRepo.create({
      userID: session.id!,
      roomID: input.roomID,
      name: input.name,
      description: input.description,
      badge: '',
    })
    const newGang = await this.gangRepo.create({
      groupID: newGroup.id!,
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
    const doesUserOwnCorp: boolean = matchingGang.groupID === session.id;
    if (!doesUserOwnCorp) {
      throw new UnauthorizedException();
    }
    await this.groupRepo.update({ id: matchingGang.groupID }, input);
    return true;
  }

  @Mutation(() => Boolean)
  gangDelete(
    @Args('filter') filter: GangFilterOneInput,
    @GetUser() session: UserEntity
  ): Promise<Boolean> {
    throw new Error('not implemented');
  }

  private async userOwnsRoom(user: UserEntity, roomID: number) {
    const matchingRoom = await this.roomRepo.findOneOrFail({ id: roomID });
    if (matchingRoom.userID !== user.id) {
      throw new UnauthorizedException();
    }
  }
}
