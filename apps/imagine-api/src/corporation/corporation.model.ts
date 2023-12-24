import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class CorporationModel {
  @Field(() => Number, {nullable: true})
  id!: number;

  @Field(() => String, {nullable: true})
  name!: string;

  @Field(() => String, {nullable: true})
  description!: string;
}
