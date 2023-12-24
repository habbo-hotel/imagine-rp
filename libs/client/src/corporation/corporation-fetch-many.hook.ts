import { useLazyQuery } from "@apollo/client";
import { CORPORATION_FETCH_MANY_QUERY, CorporationFetchManyQueryResponse, CorporationFetchManyQueryVariables } from "./corporation-fetch-many.query";
import { CorporationFragment } from "./corporation.fragment";
import { CorporationFilterManyInput } from "../../../../apps/imagine-api/src/corporation/corporation.input";

export interface UseCorporationFetchManyResponse {
  fetch(filter: CorporationFilterManyInput): Promise<CorporationFragment>;
  error?: Error;
  loading: boolean;
  data?: CorporationFragment[];
}

export function useCorporationFetchMany(): UseCorporationFetchManyResponse {
  const [getCorporation, { loading, error, data }] = useLazyQuery<CorporationFetchManyQueryResponse, CorporationFetchManyQueryVariables>(CORPORATION_FETCH_MANY_QUERY);

  const onFetchCorporation = async (filter: CorporationFilterManyInput): Promise<CorporationFragment[]> => {
    const matchingCorporation = await getCorporation({ fetchPolicy: "network-only", variables: { filter } })
    return matchingCorporation.data!.corporations;
  }

  return {
    fetch: onFetchCorporation,
    error,
    loading,
    data: data?.corporations,
  }
}