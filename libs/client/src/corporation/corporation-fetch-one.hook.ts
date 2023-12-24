import { useLazyQuery } from "@apollo/client";
import { CORPORATION_FETCH_ONE_QUERY, CorporationFetchOneQueryResponse, CorporationFetchOneQueryVariables } from "./corporation-fetch-one.query";
import { CorporationFragment } from "./corporation.fragment";
import { CorporationFilterOneInput } from "../../../../apps/imagine-api/src/corporation/corporation.input";

export interface UseCorporationFetchOneResponse {
  fetch(filter: CorporationFilterOneInput): Promise<CorporationFragment>;
  error?: Error;
  loading: boolean;
  data?: CorporationFragment;
}

export function useCorporationFetchOne(): UseCorporationFetchOneResponse {
  const [getCorporation, { loading, error, data }] = useLazyQuery<CorporationFetchOneQueryResponse, CorporationFetchOneQueryVariables>(CORPORATION_FETCH_ONE_QUERY);

  const onFetchCorporation = async (filter: CorporationFilterOneInput): Promise<CorporationFragment> => {
    const matchingCorporation = await getCorporation({ fetchPolicy: "network-only", variables: { filter } })
    return matchingCorporation.data!.corporation;
  }

  return {
    fetch: onFetchCorporation,
    error,
    loading,
    data: data?.corporation,
  }
}