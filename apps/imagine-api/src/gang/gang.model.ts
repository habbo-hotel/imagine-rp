import {Field, ObjectType} from '@nestjs/graphql';
import {GangEntity} from '../database/gang.entity';

@ObjectType()
export class GangModel {
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

  static fromEntity(entity: GangEntity): GangModel {
    return {
      id: entity.id!,
      name: entity.name,
      description: entity.description,
      badgeCode: entity.badgeCode,
      userID: entity.userID,
    };
  }
}
