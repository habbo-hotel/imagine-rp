import {Field, InputType} from '@nestjs/graphql';
import {Max} from 'class-validator';
import {GLOBAL_MAX_RESOURCE_LIMIT} from '../imagine.constant';

@InputType()
export class CorporationFilterOneInput {
  @Field(() => Number)
  id!: number;
}

@InputType()
export class CorporationFilterManyInput {
  @Field(() => [Number, {nullable: true}])
  ids?: number[];

  @Field(() => String, {nullable: true})
  nameContains?: string;

  @Field(() => Number, {nullable: true})
  skip?: number;

  @Field(() => Number, {nullable: true})
  @Max(GLOBAL_MAX_RESOURCE_LIMIT)
  limit?: number;
}

@InputType()
export class CorporationCreateInput {}

@InputType()
export class CorporationUpdateInput
  implements Partial<CorporationCreateInput> {}
