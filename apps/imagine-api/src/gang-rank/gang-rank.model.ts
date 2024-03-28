import {Field, ObjectType} from '@nestjs/graphql';
import {GangRankEntity} from '../database/gang-rank.entity';

@ObjectType()
export class GangRankModel {
  @Field(() => Number, {nullable: true})
  id!: number;

  @Field(() => Number, {nullable: true})
  gangID!: number;

  @Field(() => String, {nullable: true})
  name!: string;

  @Field(() => String, {nullable: true})
  description!: string;

  static fromEntity(entity: GangRankEntity): GangRankModel {
    return {
      id: entity.id!,
      gangID: entity.gangID,
      name: entity.name,
      description: entity.desciption,
    };
  }
}
