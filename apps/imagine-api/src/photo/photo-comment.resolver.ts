import {In} from 'typeorm';
import {UserModel} from '../user/user.model';
import {UserEntity} from '../database/user.entity';
import {UnauthorizedException} from '@nestjs/common';
import {PhotoCommentModel} from './photo-comment.model';
import {PhotoReactionModel} from './photo-reaction.model';
import {HasSession} from '../session/has-session.decorator';
import {PhotoCommentService} from './photo-comment.service';
import {UserRepository} from '../database/user.repository';
import {PhotoCommentDataloaderService} from './photo-comment.dataloader';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  PhotoCommentCreateInput,
  PhotoCommentFilterManyInput,
  PhotoCommentFilterOneInput,
} from './photo-comment.input';
import {GetUser} from '../session/get-user.decorator';

@Resolver(() => PhotoCommentModel)
export class PhotoCommentResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly photoCommentService: PhotoCommentService,
    private readonly photoCommentDataloaderService: PhotoCommentDataloaderService
  ) {}

  @ResolveField(() => UserModel)
  user(@Parent() photoReaction: PhotoReactionModel): Promise<UserModel> {
    return this.userRepo.findOneOrFail({id: photoReaction.userID});
  }

  @Query(() => PhotoCommentModel)
  async photoComment(
    @Args('filter') filter: PhotoCommentFilterOneInput
  ): Promise<PhotoCommentModel> {
    return this.photoCommentDataloaderService.loadById(filter.id);
  }

  @Query(() => [PhotoCommentModel])
  photoComments(
    @Args('filter', {type: () => PhotoCommentFilterManyInput, nullable: true})
    filter: PhotoCommentFilterManyInput
  ): Promise<PhotoCommentModel[]> {
    return this.photoCommentService.findMany({
      id: filter?.ids && In(filter.ids),
      userID: filter?.userIDs && In(filter.userIDs),
    });
  }

  @Mutation(() => PhotoCommentModel)
  @HasSession()
  async photoCommentCreate(
    @Args('input', {type: () => PhotoCommentCreateInput})
    input: PhotoCommentCreateInput,
    @GetUser() session: UserEntity
  ): Promise<PhotoCommentModel> {
    return this.photoCommentService.create({
      userID: session.id!,
      comment: input.comment,
      resourceID: input.photoID,
    });
  }

  @Mutation(() => PhotoCommentModel)
  @HasSession()
  async photoCommentUpdate(
    @Args('filter', {type: () => PhotoCommentFilterOneInput})
    filter: PhotoCommentFilterOneInput,
    @Args('input', {type: () => PhotoCommentCreateInput})
    input: PhotoCommentCreateInput,
    @GetUser() session: UserEntity
  ): Promise<PhotoCommentModel> {
    const matchingPhotoComment = await this.photoCommentService.findOne({
      id: filter.id,
    });
    const userOwnsPhotoComment = matchingPhotoComment.userID === session.id!;
    if (!userOwnsPhotoComment) {
      throw new UnauthorizedException();
    }
    await this.photoCommentService.update(filter.id, input.comment);
    return this.photoComment(filter);
  }

  @Mutation(() => Boolean)
  async photoCommentDelete(
    @Args('id') id: number,
    @GetUser() session: UserEntity
  ) {
    const matchingPhotoComment = await this.photoCommentService.findOne({id});
    const userOwnsPhotoComment = matchingPhotoComment.userID === session.id!;
    if (!userOwnsPhotoComment) {
      throw new UnauthorizedException();
    }
    await this.photoCommentService.delete(id);
    await this.photoCommentDataloaderService.clearByID(id);
    return true;
  }
}
