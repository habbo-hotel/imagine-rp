import {UserModel} from '../user/user.model';
import {PhotoWire} from '@imagine-cms/types';
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class PhotoModel implements PhotoWire {
  @Field({nullable: true})
  id?: number;

  @Field({nullable: true})
  userID?: number;

  @Field(() => UserModel, {nullable: true})
  user?: UserModel;

  @Field({nullable: true})
  photoURL?: string;

  @Field({nullable: true})
  createdAt?: number;
}
