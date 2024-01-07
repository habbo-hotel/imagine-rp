import { useCorporationFetchOne, useGangFetchOne, useRPStatsFetchOne } from '@imagine-cms/client';
import { Column, Text } from '../../../common';
import { useEffect } from 'react';
import { Badge } from '@imagine-cms/shared-ui';

export function RoleplayStatsView({ userID }: { userID: number }) 
{
    const fetchRPStats = useRPStatsFetchOne();
    const fetchCorp = useCorporationFetchOne();
    const fetchGang = useGangFetchOne();

    async function refresh() 
    {
        const rpStats = await fetchRPStats.fetch({ userID });
        if (rpStats.corporationID) 
        {
            fetchCorp.fetch({ id: rpStats.corporationID });
        }
        if (rpStats.gangID) 
        {
            fetchGang.fetch({ id: rpStats.gangID });
        }
    }

    useEffect(() => 
    {
        refresh();
    }, [ userID ]);

    return (
        <Column gap={ 1 }>
            <Text small>
                <b>My Job</b><br />
                { fetchCorp.data && <Badge badge={ { code: fetchCorp.data.badgeCode } } /> }
                <p>{ fetchCorp.data?.name ?? <>Unemployed</> }</p>
            </Text>
            <Text small>
                <b>My Gang</b><br />
                <p>{ fetchGang.data?.name ?? <>No gang affiliation</> }</p>
            </Text>
        </Column>
    )
}