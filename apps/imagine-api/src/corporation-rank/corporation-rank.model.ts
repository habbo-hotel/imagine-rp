import { Field, ObjectType } from '@nestjs/graphql';
import { CorporationRankEntity } from '../database/corporation-rank.entity';

@ObjectType()
export class CorporationRankModel {
  @Field(() => Number, { nullable: true })
  id!: number;

  @Field(() => Number, { nullable: true })
  corporationID!: number;

  @Field(() => Number, { nullable: true })
  rankPosition!: number;

  @Field(() => String, { nullable: true })
  name!: string;

  static fromEntity(entity: CorporationRankEntity): CorporationRankModel {
    return {
      id: entity.id!,
      corporationID: entity.corporationID,
      rankPosition: entity.rankPosition,
      name: entity.name,
    };
  }
}
