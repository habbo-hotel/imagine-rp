import gql from 'graphql-tag';
import {RankWire} from '@imagine-cms/types';
import {UseQueryResponse, useRunQuery} from '../graphql/run-query';

const FETCH_STAFF_RANKS = gql`
    query {
        ranks {
            id,
            name,
            badgeCode
        }
    }
`

export const useFetchStaffRanks = (): UseQueryResponse<{ranks: RankWire[]}> => {
  return useRunQuery(FETCH_STAFF_RANKS);
}
