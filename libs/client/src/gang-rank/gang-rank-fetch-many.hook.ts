import { useLazyQuery } from "@apollo/client";
import { GangRankFilterManyInput } from "./gang-rank.input";
import { GangRankFragment } from "./gang-rank.fragment";
import { GANG_RANK_FETCH_MANY_QUERY, GangRankFilterManyQueryResponse, GangRankFilterManyQueryVariables } from "./gang-rank-fetch-many.query";

export interface UseGangRankFilterManyResponse {
  fetch(filter: GangRankFilterManyInput): Promise<GangRankFragment[]>;
  error?: Error;
  loading: boolean;
  data?: GangRankFragment[];
}

export function useGangRankFetchMany(): UseGangRankFilterManyResponse {
  const [getGangRank, { loading, error, data }] = useLazyQuery<GangRankFilterManyQueryResponse, GangRankFilterManyQueryVariables>(GANG_RANK_FETCH_MANY_QUERY);

  const onFilterGangRank = async (filter: GangRankFilterManyInput): Promise<GangRankFragment[]> => {
    const matchingGangRank = await getGangRank({ fetchPolicy: "network-only", variables: { filter } })
    return matchingGangRank.data!.gangRanks;
  }

  return {
    fetch: onFilterGangRank,
    error,
    loading,
    data: data?.gangRanks,
  }
}