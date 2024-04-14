import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CorporationModel } from './corporation.model';
import {
  CorporationCreateInput,
  CorporationFilterManyInput,
  CorporationFilterOneInput,
  CorporationUpdateInput,
} from './corporation.input';
import { GetUser } from '../session/get-user.decorator';
import { UserEntity } from '../database/user.entity';
import { CorporationRepository } from '../database/corporation.repository';
import { UnauthorizedException } from '@nestjs/common';
import { ILike, In } from 'typeorm';
import { CorporationEntity } from '../database/corporation.entity';
import { UserModel } from '../user/user.model';
import { GroupModel } from '../group/group.model';
import { GroupRepository } from '../database/group.repository';
import { GroupEntity } from '../database/group.entity';
import { RoomRepository } from '../database/room.repository';

@Resolver(() => CorporationModel)
export class CorporationResolver {
  constructor(
    private readonly roomRepo: RoomRepository,
    private readonly groupRepo: GroupRepository,
    private readonly corporationRepo: CorporationRepository,
  ) { }

  @ResolveField(() => UserModel, { nullable: true })
  async group(@Parent() parent: CorporationModel): Promise<GroupModel> {
    const matchingGroup = await this.groupRepo.findOneOrFail({ id: parent.groupID });
    return GroupModel.fromEntity(matchingGroup);
  }

  @Query(() => [CorporationModel])
  async corporations(
    @Args('filter') filter: CorporationFilterManyInput
  ): Promise<CorporationModel[]> {
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
    const matchingCorps: CorporationEntity[] = await this.corporationRepo.find({
      where: {
        groupID: In(matchingGroups.map(_ => _.id))
      }
    })
    return matchingCorps.map(CorporationModel.fromEntity);
  }

  @Query(() => CorporationModel)
  async corporation(
    @Args('filter') filter: CorporationFilterOneInput
  ): Promise<CorporationModel> {
    const matchingCorporation = await this.corporationRepo.findOneOrFail({
      groupID: filter.id,
    });
    return CorporationModel.fromEntity(matchingCorporation);
  }

  @Mutation(() => CorporationModel)
  async corporationCreate(
    @Args('filter') input: CorporationCreateInput,
    @GetUser() session: UserEntity
  ): Promise<CorporationModel> {
    await this.userOwnsRoom(session, input.roomID);
    const newGroup = await this.groupRepo.create({
      userID: session.id!,
      name: input.name,
      description: input.description,
      roomID: input.roomID,
      badge: '',
    })
    const newCorporation = await this.corporationRepo.create({
      groupID: newGroup.id!,
      tags: '',
    });
    return CorporationModel.fromEntity(newCorporation);
  }

  @Mutation(() => Boolean)
  async corporationUpdate(
    @Args('filter') filter: CorporationFilterOneInput,
    @Args('filter') input: CorporationUpdateInput,
    @GetUser() session: UserEntity
  ): Promise<Boolean> {
    if (input.roomID) {
      await this.userOwnsRoom(session, input.roomID);
    }
    const matchingCorporation: CorporationModel =
      await this.corporation(filter);
    const matchingGroup = await this.groupRepo.findOneOrFail({ id: matchingCorporation.groupID });
    const doesUserOwnCorp: boolean = matchingGroup.userID === session.id;
    if (!doesUserOwnCorp) {
      throw new UnauthorizedException();
    }
    await this.groupRepo.update({ id: matchingCorporation.groupID }, input);
    return true;
  }

  @Mutation(() => Boolean)
  corporationDelete(
    @Args('filter') filter: CorporationFilterOneInput,
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
