import { useLazyQuery } from "@apollo/client";
import { GangFragment } from "./gang.fragment";
import { GANG_FETCH_MANY_QUERY, GangFetchManyQueryResponse, GangFetchManyQueryVariables } from "./gang-fetch-many.query";
import { GangFilterManyInput } from "./gang.input";

export interface UseGangFetchManyResponse {
  fetch(filter: GangFilterManyInput): Promise<GangFragment[]>;
  error?: Error;
  loading: boolean;
  data?: GangFragment[];
}

export function useGangFetchMany(): UseGangFetchManyResponse {
  const [getGang, { loading, error, data }] = useLazyQuery<GangFetchManyQueryResponse, GangFetchManyQueryVariables>(GANG_FETCH_MANY_QUERY);

  const onFetchGang = async (filter: GangFilterManyInput): Promise<GangFragment[]> => {
    const matchingGang = await getGang({ fetchPolicy: "network-only", variables: { filter } })
    return matchingGang.data!.gangs;
  }

  return {
    fetch: onFetchGang,
    error,
    loading,
    data: data?.gangs,
  }
}