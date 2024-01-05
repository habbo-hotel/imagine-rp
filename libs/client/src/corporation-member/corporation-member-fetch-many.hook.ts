import { useLazyQuery } from "@apollo/client";
import { CorporationMemberFilterManyInput } from "./corporation-member.input";
import { CorporationMemberFragment } from "./corporation-member.fragment";
import { CORPORATION_MEMBER_FETCH_MANY_QUERY, CorporationMemberFilterManyQueryResponse, CorporationMemberFilterManyQueryVariables } from "./corporation-member-fetch-many.query";

export interface UseCorporationMemberFilterManyResponse {
  fetch(filter: CorporationMemberFilterManyInput): Promise<CorporationMemberFragment[]>;
  error?: Error;
  loading: boolean;
  data?: CorporationMemberFragment[];
}

export function useCorporationMemberFetchMany(): UseCorporationMemberFilterManyResponse {
  const [getCorporationMember, { loading, error, data }] = useLazyQuery<CorporationMemberFilterManyQueryResponse, CorporationMemberFilterManyQueryVariables>(CORPORATION_MEMBER_FETCH_MANY_QUERY);

  const onFilterCorporationMember = async (filter: CorporationMemberFilterManyInput): Promise<CorporationMemberFragment[]> => {
    const matchingCorporationMember = await getCorporationMember({ fetchPolicy: "network-only", variables: { filter } })
    return matchingCorporationMember.data!.corporationMembers;
  }

  return {
    fetch: onFilterCorporationMember,
    error,
    loading,
    data: data?.corporationMembers,
  }
}