import { Field, ObjectType } from '@nestjs/graphql';
import { RPStatsEntity } from '../database/rp-stats.entity';

@ObjectType()
export class RPStatsModel {
  @Field(() => Number, { nullable: true })
  userID!: number;

  @Field(() => Number, { nullable: true })
  health!: number;

  @Field(() => Number, { nullable: true })
  energy!: number;

  @Field(() => Number, { nullable: true })
  hunger!: number;

  @Field(() => Number, { nullable: true })
  armor!: number;

  static fromEntity(entity: RPStatsEntity): RPStatsModel {
    return {
      userID: entity.userID,
      health: entity.health,
      energy: entity.energy,
      hunger: entity.hunger,
      armor: entity.armor,
    };
  }
}
