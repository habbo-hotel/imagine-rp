import gql from 'graphql-tag';
import { UserGender, UserWire } from '@imagine-cms/types';
import { UseMutationResponse, useRunMutation } from './run-mutation.hook';

const CREATE_NEW_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!, $betaCode: String, $gender: String, $look: String) {
    userCreate(newUser: {email: $email, username: $username, password: $password, betaCode: $betaCode, gender: $gender, look: $look}) {
      id
      username
      rankID
    }
  }
`;

export const useUserCreateMutation = (
  username: string,
  email: string,
  password: string,
  betaCode?: string,
  gender?: UserGender,
  look?: string
): UseMutationResponse<{ userCreate: UserWire }> => {
  return useRunMutation(CREATE_NEW_USER, { username, email, password, betaCode, gender, look });
};
