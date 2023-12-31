import {Field, ObjectType} from '@nestjs/graphql';
import {GangRankEntity} from '../database/gang-rank.entity';

@ObjectType()
export class GangRankModel {
  @Field(() => Number, {nullable: true})
  id!: number;

  @Field(() => Number, {nullable: true})
  gangID!: number;

  @Field(() => Number, {nullable: true})
  rankPosition!: number;

  @Field(() => String, {nullable: true})
  name!: string;

  static fromEntity(entity: GangRankEntity): GangRankModel {
    return {
      id: entity.id!,
      gangID: entity.gangID,
      rankPosition: entity.rankPosition,
      name: entity.name,
    };
  }
}
