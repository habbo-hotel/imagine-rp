import { useLazyQuery } from "@apollo/client";
import { PhotoCommentFilterOneInput } from "../input/photo-comment.input";
import { PhotoCommentFragment } from "../fragments/photo-comment.fragment";
import { PHOTO_COMMENT_FETCH_ONE_QUERY, PhotoCommentFetchOneResponse, PhotoCommentFetchOneVariables } from "../queries/photo-comment-fetch-one.query";

export interface UsePhotoCommentFetchOneResponse {
  fetch(filter: PhotoCommentFilterOneInput): Promise<PhotoCommentFragment>;
  error?: Error;
  loading: boolean;
  data?: PhotoCommentFragment;
}

export function usePhotoCommentFetchOne(): UsePhotoCommentFetchOneResponse {
  const [getPhotoComment, { loading, error, data }] = useLazyQuery<PhotoCommentFetchOneResponse, PhotoCommentFetchOneVariables>(PHOTO_COMMENT_FETCH_ONE_QUERY);

  const onFetchPhotoComment = async (filter: PhotoCommentFilterOneInput): Promise<PhotoCommentFragment> => {
    const matchingPhotoComment = await getPhotoComment({ variables: { filter } })
    console.log(matchingPhotoComment)
    return matchingPhotoComment.data!.photoComment;
  }

  return {
    fetch: onFetchPhotoComment,
    error,
    loading,
    data: data?.photoComment,
  }
}