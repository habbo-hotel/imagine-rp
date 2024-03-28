import {Field, ObjectType} from '@nestjs/graphql';
import {CorporationRankEntity} from '../database/corporation-rank.entity';

@ObjectType()
export class CorporationRankModel {
  @Field(() => Number, {nullable: true})
  id!: number;

  @Field(() => Number, {nullable: true})
  corporationID!: number;

  @Field(() => String, {nullable: true})
  name!: string;

  @Field(() => String, {nullable: true})
  description!: string;

  static fromEntity(entity: CorporationRankEntity): CorporationRankModel {
    return {
      id: entity.id!,
      corporationID: entity.corporationID,
      name: entity.name,
      description: entity.description,
    };
  }
}
