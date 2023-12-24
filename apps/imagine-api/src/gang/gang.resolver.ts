import {Resolver, Query, Mutation} from '@nestjs/graphql';
import {GangModel} from './gang.model';

@Resolver(() => GangModel)
export class GangResolver {
  @Query(() => [GangModel])
  Gangs() {}

  @Query(() => GangModel)
  Gang() {}

  @Mutation(() => GangModel)
  GangCreate() {}

  @Mutation(() => Boolean)
  GangUpdate() {}

  @Mutation(() => Boolean)
  GangDelete() {}
}
