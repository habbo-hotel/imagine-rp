import { RelationshipStatusInfoMessageParser } from '@nitrots/nitro-renderer';
import { LocalizeText } from '../../../api';
import { Column, Text } from '../../../common';
import { RelationshipsContainerView } from './RelationshipsContainerView';

interface FriendsContainerViewProps {
    relationships: RelationshipStatusInfoMessageParser;
    friendsCount: number;
}

export function FriendsContainerView({ relationships = null, friendsCount = null }: FriendsContainerViewProps) 
{
    return (
        <Column gap={ 1 }>
            <Text small>
                <b>{ LocalizeText('extendedprofile.friends.count') }</b> { friendsCount }
            </Text>
            <Text bold small>Relationship</Text>
            <Column>
                <RelationshipsContainerView relationships={ relationships } />
            </Column>
        </Column>
    )
}
