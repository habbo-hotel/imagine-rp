import { useMutation } from "@apollo/client";
import { PhotoReactionFragment } from "../fragments/photo-reaction.fragment";
import { PhotoReactionFilterOneInput, PhotoReactionUpdateInput } from "../input/photo-reaction.input";
import { PHOTO_REACTION_UPDATE_MUTATION, PhotoReactionUpdateResponse, PhotoReactionUpdateVariables } from "../mutations/photo-reaction-update.mutation";

export interface UsePhotoReactionUpdateResponse {
  execute(filter: PhotoReactionFilterOneInput, input: PhotoReactionUpdateInput): Promise<PhotoReactionFragment>;
  error?: Error;
  loading: boolean;
  data?: PhotoReactionFragment;
}

export function usePhotoReactionUpdate(): UsePhotoReactionUpdateResponse {
  const [getPhotoReaction, { loading, error, data }] = useMutation<PhotoReactionUpdateResponse, PhotoReactionUpdateVariables>(PHOTO_REACTION_UPDATE_MUTATION);

  const onFetchPhotoReaction = async (filter: PhotoReactionFilterOneInput, input: PhotoReactionUpdateInput): Promise<PhotoReactionFragment> => {
    const matchingPhotoReaction = await getPhotoReaction({ variables: { filter, input } })
    return matchingPhotoReaction.data!.photoReaction;
  }

  return {
    execute: onFetchPhotoReaction,
    error,
    loading,
    data: data?.photoReaction,
  }
}