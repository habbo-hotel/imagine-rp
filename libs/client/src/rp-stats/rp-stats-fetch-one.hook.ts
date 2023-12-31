import { useLazyQuery } from "@apollo/client";
import { RPStatsFilterOneInput } from "./rp-stats.input";
import { RPStatsFetchOneQueryResponse, RPStatsFetchOneQueryVariables, RP_STATS_FETCH_ONE_QUERY } from "./rp-stats-fetch-one.query";
import { RPStatsFragment } from "./rp-stats.fragment";

export interface UseRPStatsFetchOneResponse {
  fetch(filter: RPStatsFilterOneInput): Promise<RPStatsFragment>;
  error?: Error;
  loading: boolean;
  data?: RPStatsFragment;
}

export function useRPStatsFetchOne(): UseRPStatsFetchOneResponse {
  const [getRPStats, { loading, error, data }] = useLazyQuery<RPStatsFetchOneQueryResponse, RPStatsFetchOneQueryVariables>(RP_STATS_FETCH_ONE_QUERY);

  const onFetchRPStats = async (filter: RPStatsFilterOneInput): Promise<RPStatsFragment> => {
    const matchingRPStats = await getRPStats({ fetchPolicy: "network-only", variables: { filter } })
    return matchingRPStats.data!.rpStat;
  }

  return {
    fetch: onFetchRPStats,
    error,
    loading,
    data: data?.rpStat,
  }
}