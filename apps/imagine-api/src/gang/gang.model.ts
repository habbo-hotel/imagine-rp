import { Field, ObjectType } from '@nestjs/graphql';
import { GangEntity } from '../database/gang.entity';

@ObjectType()
export class GangModel {
  @Field(() => Number, { nullable: true })
  groupID!: number;

  static fromEntity(entity: GangEntity): GangModel {
    return {
      groupID: entity.groupID,
    };
  }
}
