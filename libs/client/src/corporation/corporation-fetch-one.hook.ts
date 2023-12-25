import { useLazyQuery } from "@apollo/client";
import { CORPORATION_FETCH_ONE_QUERY, CorporationFilterOneQueryResponse, CorporationFilterOneQueryVariables } from "./corporation-fetch-one.query";
import { CorporationFragment } from "./corporation.fragment";
import { CorporationFilterOneInput } from "./corporation.input";

export interface UseCorporationFilterOneResponse {
  fetch(filter: CorporationFilterOneInput): Promise<CorporationFragment>;
  error?: Error;
  loading: boolean;
  data?: CorporationFragment;
}

export function useCorporationFetchOne(): UseCorporationFilterOneResponse {
  const [getCorporation, { loading, error, data }] = useLazyQuery<CorporationFilterOneQueryResponse, CorporationFilterOneQueryVariables>(CORPORATION_FETCH_ONE_QUERY);

  const onFilterCorporation = async (filter: CorporationFilterOneInput): Promise<CorporationFragment> => {
    const matchingCorporation = await getCorporation({ fetchPolicy: "network-only", variables: { filter } })
    return matchingCorporation.data!.corporation;
  }

  return {
    fetch: onFilterCorporation,
    error,
    loading,
    data: data?.corporation,
  }
}