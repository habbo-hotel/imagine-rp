import {Resolver, Query, Mutation} from '@nestjs/graphql';
import {CorporationModel} from './corporation.model';

@Resolver(() => CorporationModel)
export class CorporationResolver {
  @Query(() => [CorporationModel])
  corporations() {}

  @Query(() => CorporationModel)
  corporation() {}

  @Mutation(() => CorporationModel)
  corporationCreate() {}

  @Mutation(() => Boolean)
  corporationUpdate() {}

  @Mutation(() => Boolean)
  corporationDelete() {}
}
