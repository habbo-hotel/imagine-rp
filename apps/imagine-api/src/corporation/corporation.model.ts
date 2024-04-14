import { Field, ObjectType } from '@nestjs/graphql';
import { CorporationEntity } from '../database/corporation.entity';

@ObjectType()
export class CorporationModel {
  @Field(() => Number, { nullable: true })
  groupID!: number;

  @Field(() => [String], { nullable: true })
  tags!: string[];

  static fromEntity(entity: CorporationEntity): CorporationModel {
    return {
      groupID: entity.groupID,
      tags: entity.tags.split(',')
    };
  }
}
