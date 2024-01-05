import { useLazyQuery } from "@apollo/client";
import { GangFragment } from "./gang.fragment";
import { GANG_FETCH_ONE_QUERY, GangFetchOneQueryResponse, GangFetchOneQueryVariables } from "./gang-fetch-one.query";
import { GangFilterOneInput } from "./gang.input";

export interface UseGangFetchOneResponse {
  fetch(filter: GangFilterOneInput): Promise<GangFragment>;
  error?: Error;
  loading: boolean;
  data?: GangFragment;
}

export function useGangFetchOne(): UseGangFetchOneResponse {
  const [getGang, { loading, error, data }] = useLazyQuery<GangFetchOneQueryResponse, GangFetchOneQueryVariables>(GANG_FETCH_ONE_QUERY);

  const onFetchGang = async (filter: GangFilterOneInput): Promise<GangFragment> => {
    const matchingGang = await getGang({ fetchPolicy: "network-only", variables: { filter } })
    return matchingGang.data!.gang;
  }

  return {
    fetch: onFetchGang,
    error,
    loading,
    data: data?.gang,
  }
}