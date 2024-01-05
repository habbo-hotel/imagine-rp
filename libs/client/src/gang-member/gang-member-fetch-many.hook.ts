import { useLazyQuery } from "@apollo/client";
import { GangMemberFilterManyInput } from "./gang-member.input";
import { GangMemberFragment } from "./gang-member.fragment";
import { GANG_MEMBER_FETCH_MANY_QUERY, GangMemberFilterManyQueryResponse, GangMemberFilterManyQueryVariables } from "./gang-member-fetch-many.query";

export interface UseGangMemberFilterManyResponse {
  fetch(filter: GangMemberFilterManyInput): Promise<GangMemberFragment[]>;
  error?: Error;
  loading: boolean;
  data?: GangMemberFragment[];
}

export function useGangMemberFetchMany(): UseGangMemberFilterManyResponse {
  const [getGangMember, { loading, error, data }] = useLazyQuery<GangMemberFilterManyQueryResponse, GangMemberFilterManyQueryVariables>(GANG_MEMBER_FETCH_MANY_QUERY);

  const onFilterGangMember = async (filter: GangMemberFilterManyInput): Promise<GangMemberFragment[]> => {
    const matchingGangMember = await getGangMember({ fetchPolicy: "network-only", variables: { filter } })
    return matchingGangMember.data!.gangMembers;
  }

  return {
    fetch: onFilterGangMember,
    error,
    loading,
    data: data?.gangMembers,
  }
}