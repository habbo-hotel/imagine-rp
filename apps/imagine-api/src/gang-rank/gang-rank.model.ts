import {Field, ObjectType} from '@nestjs/graphql';
import {GangRankEntity} from '../database/gang-rank.entity';

@ObjectType()
export class GangRankModel {
  @Field(() => Number, {nullable: true})
  id!: number;

  @Field(() => Number, {nullable: true})
  gangID!: number;

  @Field(() => Number, {nullable: true})
  gangRankID!: number;

  @Field(() => String, {nullable: true})
  name!: string;

  static fromEntity(entity: GangRankEntity): GangRankModel {
    return {
      id: entity.id!,
      gangID: entity.gangID,
      gangRankID: entity.gangRankID,
      name: entity.name,
    };
  }
}
