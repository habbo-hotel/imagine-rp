import gql from 'graphql-tag';

export const SESSION_CREATED_FRAGMENT: any = gql`
  fragment SessionCreatedFragment on SessionCreatedModel {
    id
    userID
    accessToken
  }
`

export interface SessionCreatedFragment {
  id: number;
  userID: number;
  accessToken: string;
}