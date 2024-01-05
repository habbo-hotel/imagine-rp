import gql from 'graphql-tag';
import { UserCreateInput } from './user.input';
import { SESSION_CREATED_FRAGMENT, SessionCreatedFragment } from '../session/session.fragment';

export const USER_CREATE_MUTATION: any = gql`
  ${SESSION_CREATED_FRAGMENT}
  mutation($input: UserCreateInput!) {
    userCreate(input: $input) {
      ...SessionCreatedFragment
    }
  }
`

export interface UserCreateMutationVariables {
  input: UserCreateInput;
}

export interface UserCreateMutationResponse {
  userCreate: SessionCreatedFragment;
}