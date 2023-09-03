import { useLazyQuery } from "@apollo/client";
import { PhotoCommentFilterManyInput } from "../input/photo-comment.input";
import { PhotoCommentFragment } from "../fragments/photo-comment.fragment";
import { PHOTO_COMMENT_FETCH_MANY_QUERY, PhotoCommentFetchManyQueryResponse, PhotoCommentFetchManyQueryVariables } from "../queries/photo-comment-fetch-many.query";

export interface UsePhotoCommentFetchManyResponse {
  fetch(filter: PhotoCommentFilterManyInput): Promise<PhotoCommentFragment[]>;
  error?: Error;
  loading: boolean;
  data?: PhotoCommentFragment[];
}

export function usePhotoCommentFetchMany(): UsePhotoCommentFetchManyResponse {
  const [getPhotoComments, { loading, error, data }] = useLazyQuery<PhotoCommentFetchManyQueryResponse, PhotoCommentFetchManyQueryVariables>(PHOTO_COMMENT_FETCH_MANY_QUERY);

  const onFetchPhotoComments = async (filter: PhotoCommentFilterManyInput): Promise<PhotoCommentFragment[]> => {
    const matchingPhotoComments = await getPhotoComments({ variables: { filter } })
    return matchingPhotoComments.data!.photoComments;
  }

  return {
    fetch: onFetchPhotoComments,
    error,
    loading,
    data: data?.photoComments,
  }
}