import { useMutation } from "@apollo/client";
import { USER_CREATE_MUTATION, UserCreateMutationResponse } from "./user-create.mutation";
import { UserCreateInput } from './user.input';
import { SessionCreatedFragment } from "../session/session.fragment";

export interface UseUserCreateResponse {
  execute(input: UserCreateInput): Promise<SessionCreatedFragment>;
  error?: Error;
  loading: boolean;
  data?: SessionCreatedFragment;
}

export function useUserCreate(): UseUserCreateResponse {
  const [createUser, { loading, error, data }] = useMutation<UserCreateMutationResponse>(USER_CREATE_MUTATION);

  const onFetchUser = async (input: UserCreateInput): Promise<SessionCreatedFragment> => {
    const matchingUser = await createUser({ variables: { input } });
    return matchingUser.data!.userCreate;
  }

  return {
    execute: onFetchUser,
    error,
    loading,
    data: data?.userCreate,
  }
}