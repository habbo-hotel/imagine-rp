import {Field, ObjectType} from '@nestjs/graphql';
import {CorporationEntity} from '../database/corporation.entity';

@ObjectType()
export class CorporationModel {
  @Field(() => Number, {nullable: true})
  id!: number;

  @Field(() => String, {nullable: true})
  name!: string;

  @Field(() => String, {nullable: true})
  description!: string;

  @Field(() => String, {nullable: true})
  badgeCode!: string;

  @Field(() => Number, {nullable: true})
  userID!: number;

  @Field(() => Number, {nullable: true})
  roomID!: number;

  static fromEntity(entity: CorporationEntity): CorporationModel {
    return {
      id: entity.id!,
      name: entity.name,
      description: entity.description,
      badgeCode: entity.badgeCode,
      userID: entity.userID,
      roomID: entity.roomID,
    };
  }
}
