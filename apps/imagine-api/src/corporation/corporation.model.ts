import {Field, ObjectType} from '@nestjs/graphql';
import {CorporationEntity} from '../database/corporation.entity';

@ObjectType()
export class CorporationModel {
  @Field(() => Number, {nullable: true})
  id!: number;

  @Field(() => Number, {nullable: true})
  userID!: number;

  @Field(() => Number, {nullable: true})
  roomID!: number;

  @Field(() => String, {nullable: true})
  name!: string;

  @Field(() => String, {nullable: true})
  description!: string;

  @Field(() => String, {nullable: true})
  badgeCode!: string;

  static fromEntity(entity: CorporationEntity): CorporationModel {
    return {
      id: entity.id!,
      name: entity.name,
      description: entity.description,
      userID: entity.userID,
      roomID: entity.roomID,
      badgeCode: entity.badgeCode,
    };
  }
}
