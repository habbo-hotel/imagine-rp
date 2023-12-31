import {Field, ObjectType} from '@nestjs/graphql';
import {FriendshipEntity} from '../database/friendship.entity';

@ObjectType()
export class FriendshipModel {
  @Field(() => Number, {nullable: true})
  userID!: number;

  @Field(() => Number, {nullable: true})
  friendID!: number;

  static fromEntity(friendshipEntity: FriendshipEntity): FriendshipModel {
    return {
      userID: friendshipEntity.userID,
      friendID: friendshipEntity.friendID,
    };
  }
}
