import { useLazyQuery } from "@apollo/client";
import { RPStatsFetchManyQueryResponse, RPStatsFetchManyQueryVariables, RP_STATS_FETCH_MANY_QUERY } from "./rp-stats-fetch-many.query";
import { RPStatsFragment } from "./rp-stats.fragment";
import { RPStatsFilterManyInput } from "./rp-stats.input";

export interface UseRPStatsFetchManyResponse {
  fetch(filter: RPStatsFilterManyInput): Promise<RPStatsFragment[]>;
  error?: Error;
  loading: boolean;
  data?: RPStatsFragment[];
}

export function useRPStatsFetchMany(): UseRPStatsFetchManyResponse {
  const [getRPStatss, { loading, error, data }] = useLazyQuery<RPStatsFetchManyQueryResponse, RPStatsFetchManyQueryVariables>(RP_STATS_FETCH_MANY_QUERY);

  const onFetchRPStatss = async (filter: RPStatsFilterManyInput): Promise<RPStatsFragment[]> => {
    const matchingRPStatss = await getRPStatss({ fetchPolicy: "network-only", variables: { filter } })
    return matchingRPStatss.data!.rpStats;
  }

  return {
    fetch: onFetchRPStatss,
    error,
    loading,
    data: data?.rpStats,
  }
}