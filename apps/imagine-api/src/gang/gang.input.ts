import {Field, InputType} from '@nestjs/graphql';
import {Max} from 'class-validator';
import {GLOBAL_MAX_RESOURCE_LIMIT} from '../imagine.constant';

@InputType()
export class GangFilterOneInput {
  @Field(() => Number)
  id!: number;
}

@InputType()
export class GangFilterManyInput {
  @Field(() => [Number], {nullable: true})
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
export class GangCreateInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  badgeCode!: string;
}

@InputType()
export class GangUpdateInput implements Partial<GangCreateInput> {
  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => String, {nullable: true})
  description?: string;

  @Field(() => String, {nullable: true})
  badgeCode?: string;
}
