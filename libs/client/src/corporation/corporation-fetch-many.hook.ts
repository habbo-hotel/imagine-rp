import { useLazyQuery } from "@apollo/client";
import { CORPORATION_FETCH_MANY_QUERY, CorporationFilterManyQueryResponse, CorporationFilterManyQueryVariables } from "./corporation-fetch-many.query";
import { CorporationFilterManyInput } from "./corporation.input";
import { CorporationFragment } from "./corporation.fragment";

export interface UseCorporationFilterManyResponse {
  fetch(filter: CorporationFilterManyInput): Promise<CorporationFragment>;
  error?: Error;
  loading: boolean;
  data?: CorporationFragment[];
}

export function useCorporationFetchMany(): UseCorporationFilterManyResponse {
  const [getCorporation, { loading, error, data }] = useLazyQuery<CorporationFilterManyQueryResponse, CorporationFilterManyQueryVariables>(CORPORATION_FETCH_MANY_QUERY);

  const onFilterCorporation = async (filter: CorporationFilterManyInput): Promise<CorporationFragment[]> => {
    const matchingCorporation = await getCorporation({ fetchPolicy: "network-only", variables: { filter } })
    return matchingCorporation.data!.corporations;
  }

  return {
    fetch: onFilterCorporation,
    error,
    loading,
    data: data?.corporations,
  }
}