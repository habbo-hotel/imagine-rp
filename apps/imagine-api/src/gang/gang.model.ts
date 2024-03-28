import {Field, ObjectType} from '@nestjs/graphql';
import {GangEntity} from '../database/gang.entity';

@ObjectType()
export class GangModel {
  @Field(() => Number, {nullable: true})
  id!: number;

  @Field(() => Number, {nullable: true})
  userID!: number;

  @Field(() => String, {nullable: true})
  name!: string;

  @Field(() => String, {nullable: true})
  description!: string;

  @Field(() => String, {nullable: true})
  badgeCode!: string;

  static fromEntity(entity: GangEntity): GangModel {
    return {
      id: entity.id!,
      name: entity.name,
      userID: entity.userID,
      badgeCode: entity.badgeCode,
      description: entity.description,
    };
  }
}
