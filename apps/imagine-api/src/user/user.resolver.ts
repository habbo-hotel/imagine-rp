import {now} from 'lodash';
import {UserModel} from './user.model';
import {FindOptionsOrder, In, IsNull} from 'typeorm';
import {RankModel} from '../rank/rank.model';
import {BadRequestException} from '@nestjs/common';
import {UserEntity} from '../database/user.entity';
import {DEFAULT_USER_VALUES} from './user.constant';
import {UserOnlineStatus} from '@imagine-cms/types';
import {GetUser} from '../session/get-user.decorator';
import {UserRepository} from '../database/user.repository';
import {RankRepository} from '../database/rank.repository';
import {HasSession} from '../session/has-session.decorator';
import DayJS from 'dayjs';
import {ConfigRepository} from '../database/config.repository';
import {BetaCodeRepository} from '../database/beta-code.repository';
import {
  UserCreateInput,
  UserFilterManyInput,
  UserFilterOneInput,
  UserOrderBy,
  UserUpdateInput,
} from './user.input';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  RPStatsChangeRepository,
  RPStatsRepository,
} from '../database/rp-stats.repository';
import {RPStatsModel} from '../rp-stats/rp-stats.model';
import {SessionCreatedModel} from '../session/session.model';
import {SessionService} from '../session/session.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly rankRepo: RankRepository,
    private readonly rpStatsRepo: RPStatsRepository,
    private readonly rpStatsChangeRepo: RPStatsChangeRepository,
    private readonly configRepo: ConfigRepository,
    private readonly betaCodeRepo: BetaCodeRepository,
    private readonly sessionService: SessionService
  ) {}

  @ResolveField(() => RPStatsModel, {nullable: true})
  async rpStats(@Parent() {id}: UserEntity): Promise<RPStatsModel> {
    const matchingRPStats = await this.rpStatsRepo.findOneOrFail({id: id});
    return RPStatsModel.fromEntity(matchingRPStats);
  }

  @ResolveField(() => Boolean)
  async hasBetaCode(@Parent() {id}: UserEntity): Promise<boolean> {
    const matchingBetaCode = await this.betaCodeRepo.findOne({
      where: {
        userID: id,
      },
    });
    return !!matchingBetaCode;
  }

  @ResolveField(() => String, {nullable: true})
  @HasSession()
  async email(
    @Parent() {id, email}: UserEntity,
    @GetUser() user: UserEntity
  ): Promise<string | null> {
    const canAccess = await this.ownsResourceOrCanManageUsers(id, user);
    if (!canAccess) {
      return null;
    }
    return email ?? null;
  }

  @ResolveField(() => String, {nullable: true})
  @HasSession()
  async gameSSO(
    @Parent() {id, gameSSO}: UserEntity,
    @GetUser() user: UserEntity
  ): Promise<string | null> {
    const canAccess = await this.ownsResourceOrCanManageUsers(id, user);
    if (!canAccess) {
      return null;
    }
    return gameSSO ?? null;
  }

  @ResolveField(() => String, {nullable: true})
  @HasSession()
  async ipLast(
    @Parent() {id, ipLast}: UserEntity,
    @GetUser() user: UserEntity
  ): Promise<string | null> {
    const canAccess = await this.ownsResourceOrCanManageUsers(id, user);
    if (!canAccess) {
      return null;
    }
    return ipLast;
  }

  @ResolveField(() => String, {nullable: true})
  @HasSession()
  async ipRegistered(
    @Parent() {id, ipRegistered: ipRegisteredWith}: UserEntity,
    @GetUser() user: UserEntity
  ): Promise<string | null> {
    const canAccess = await this.ownsResourceOrCanManageUsers(id, user);
    if (!canAccess) {
      return null;
    }
    return ipRegisteredWith;
  }

  @ResolveField(() => String, {nullable: true})
  @HasSession()
  async machineAddress(
    @Parent() {id, machineAddress}: UserEntity,
    @GetUser() user: UserEntity
  ): Promise<string | null> {
    const canAccess = await this.ownsResourceOrCanManageUsers(id, user);
    if (!canAccess) {
      return null;
    }
    return machineAddress ?? null;
  }

  @ResolveField('onlineStatus')
  onlineStatus(@Parent() {onlineStatus}: UserEntity): string {
    return onlineStatus;
  }

  @ResolveField('rank', () => RankModel, {nullable: true})
  async getRank(@Parent() {rankID}: UserEntity): Promise<RankModel> {
    const matchingRank = await this.rankRepo.findOneOrFail({id: rankID});
    return RankModel.fromEntity(matchingRank);
  }

  @Query(() => Number)
  async usersOnlineCount(): Promise<number> {
    const onlineUsers: [{online_users: number}] = await this.userRepo
      .getInstance()
      .query("SELECT COUNT(*) AS online_users FROM users WHERE online = '1'");
    return onlineUsers[0].online_users;
  }

  @Query(() => UserModel)
  async user(
    @Args('filter', {nullable: true, type: () => UserFilterOneInput})
    filter: UserFilterOneInput
  ): Promise<UserEntity> {
    if (!filter.id && !filter.username) {
      throw new BadRequestException();
    }
    return this.userRepo.findOneOrFail({
      id: filter.id,
      username: filter.username,
    });
  }

  @Query(() => [UserModel])
  users(@Args('filter') filter: UserFilterManyInput): Promise<UserEntity[]> {
    const userOrder: FindOptionsOrder<UserEntity> = {};

    if (filter.orderBy) {
      for (const orderBy of filter.orderBy) {
        if (orderBy === UserOrderBy.ID_DESC) {
          userOrder.id = 'DESC';
        }

        if (orderBy === UserOrderBy.CREDITS_ASC) {
          userOrder.credits = 'ASC';
        }

        if (orderBy === UserOrderBy.PIXELS_ASC) {
          userOrder.activityPoints = 'ASC';
        }

        if (orderBy === UserOrderBy.POINTS_ASC) {
          userOrder.vipPoints = 'ASC';
        }
      }
    }

    if (!filter.orderBy) {
      userOrder.id = 'DESC';
    }

    return this.userRepo.find({
      where: {
        id: filter.ids && In(filter.ids),
        username: filter.usernames && In(filter.usernames),
        onlineStatus: filter.online ? UserOnlineStatus.Online : undefined,
        ipLast: filter.ipLast && In(filter.ipLast),
        ipRegistered: filter.ipRegistered && In(filter.ipRegistered),
        machineAddress: filter.machineAddress && In(filter.machineAddress),
        rankID: filter.rankIDs && In(filter.rankIDs),
      },
      order: {
        id: 'DESC',
      },
      skip: filter?.skip,
      take: filter?.limit ?? 25,
    });
  }

  @Mutation(() => SessionCreatedModel)
  async userCreate(
    @Args('input') input: UserCreateInput
  ): Promise<SessionCreatedModel> {
    const config = await this.configRepo.findOneOrFail({});

    const newUser = await this.userRepo.create({
      ...DEFAULT_USER_VALUES,
      ...input,
      gameSSO: '',
      accountCreatedAt: DayJS().unix(),
      ipLast: '', // TODO: Add support for IPs,
      ipRegistered: '', // TODO: Add support for IPs
      machineAddress: '', // TODO: Add support for machine addresses
    });

    if (config.betaCodesRequired) {
      const matchingBetaCode = await this.betaCodeRepo.findOne({
        where: {
          betaCode: input.betaCode,
          userID: IsNull(),
        },
      });
      if (!matchingBetaCode) {
        await this.userRepo.delete({id: newUser.id!});
        throw new BadRequestException('invalid beta code');
      }
      await this.betaCodeRepo.update(
        {id: matchingBetaCode!.id!},
        {userID: newUser.id!}
      );
    }

    await this.rpStatsChangeRepo.create({
      id: newUser.id!,
    } as any);

    const newSession = await this.sessionService.generateSession(newUser.id!);

    return {
      id: newSession.session.id!,
      userID: newUser.id!,
      accessToken: newSession.accessToken,
    };
  }

  @Mutation(() => Boolean)
  async userUpdate(
    @Args('id') id: number,
    @Args('userChanges') userChanges: UserUpdateInput,
    @GetUser() session: UserEntity
  ) {
    this.ownsResource(id, session);
    await this.userRepo.update({id}, userChanges);
    return true;
  }

  @Mutation(() => Boolean)
  async userDelete(@Args('id') id: number, @GetUser() session: UserEntity) {
    this.ownsResource(id, session);
    await this.userRepo.delete({id});
    return true;
  }

  private ownsResource(userID: number, authenticatedUser: UserEntity): Boolean {
    return Number(userID) !== Number(authenticatedUser.id);
  }

  private async ownsResourceOrCanManageUsers(
    userID: number,
    authenticatedUser: UserEntity
  ): Promise<Boolean> {
    const matchingRank = await this.rankRepo.findOne({
      where: {
        id: authenticatedUser.rankID,
      },
    });

    if (matchingRank?.scopes?.manageUsers) {
      return true;
    }

    return this.ownsResource(userID, authenticatedUser);
  }
}
