import { useLazyQuery } from "@apollo/client";
import { CorporationRankFilterManyInput } from "./corporation-rank.input";
import { CorporationRankFragment } from "./corporation-rank.fragment";
import { CORPORATION_RANK_FETCH_MANY_QUERY, CorporationRankFilterManyQueryResponse, CorporationRankFilterManyQueryVariables } from "./corporation-rank-fetch-many.query";

export interface UseCorporationRankFilterManyResponse {
  fetch(filter: CorporationRankFilterManyInput): Promise<CorporationRankFragment[]>;
  error?: Error;
  loading: boolean;
  data?: CorporationRankFragment[];
}

export function useCorporationRankFetchMany(): UseCorporationRankFilterManyResponse {
  const [getCorporationRank, { loading, error, data }] = useLazyQuery<CorporationRankFilterManyQueryResponse, CorporationRankFilterManyQueryVariables>(CORPORATION_RANK_FETCH_MANY_QUERY);

  const onFilterCorporationRank = async (filter: CorporationRankFilterManyInput): Promise<CorporationRankFragment[]> => {
    const matchingCorporationRank = await getCorporationRank({ fetchPolicy: "network-only", variables: { filter } })
    return matchingCorporationRank.data!.corporationRanks;
  }

  return {
    fetch: onFilterCorporationRank,
    error,
    loading,
    data: data?.corporationRanks,
  }
}