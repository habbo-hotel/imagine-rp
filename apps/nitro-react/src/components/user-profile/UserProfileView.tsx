import { ExtendedProfileChangedMessageEvent, RelationshipStatusInfoEvent, RelationshipStatusInfoMessageParser, RoomEngineObjectEvent, RoomObjectCategory, RoomObjectType, UserCurrentBadgesComposer, UserCurrentBadgesEvent, UserProfileEvent, UserProfileParser, UserRelationshipsComposer } from '@nitrots/nitro-renderer';
import { FC, useState } from 'react';
import { GetRoomSession, GetUserProfile, LocalizeText, SendMessageComposer } from '../../api';
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../common';
import { useMessageEvent, useRoomEngineEvent } from '../../hooks';
import { FriendsContainerView } from './views/FriendsContainerView';
import { UserContainerView } from './views/UserContainerView';
import { RoleplayStatsView } from './views/RoleplayStatsView';

export function UserProfileView() 
{
    const [ userProfile, setUserProfile ] = useState<UserProfileParser>(null);
    const [ userRelationships, setUserRelationships ] = useState<RelationshipStatusInfoMessageParser>(null);

    const onClose = () => 
    {
        setUserProfile(null);
        setUserRelationships(null);
    }
    useMessageEvent<UserCurrentBadgesEvent>(UserCurrentBadgesEvent, event => 
    {
        const parser = event.getParser();

        if (!userProfile || (parser.userId !== userProfile.id)) return;
    });

    useMessageEvent<RelationshipStatusInfoEvent>(RelationshipStatusInfoEvent, event => 
    {
        const parser = event.getParser();

        if (!userProfile || (parser.userId !== userProfile.id)) return;

        setUserRelationships(parser);
    });

    useMessageEvent<UserProfileEvent>(UserProfileEvent, event => 
    {
        const parser = event.getParser();

        let isSameProfile = false;

        setUserProfile(prevValue => 
        {
            if (prevValue && prevValue.id) isSameProfile = (prevValue.id === parser.id);

            return parser;
        });

        if (!isSameProfile) 
        {
            setUserRelationships(null);
        }

        SendMessageComposer(new UserCurrentBadgesComposer(parser.id));
        SendMessageComposer(new UserRelationshipsComposer(parser.id));
    });

    useMessageEvent<ExtendedProfileChangedMessageEvent>(ExtendedProfileChangedMessageEvent, event => 
    {
        const parser = event.getParser();

        if (parser.userId != userProfile?.id) return;

        GetUserProfile(parser.userId);
    });

    useRoomEngineEvent<RoomEngineObjectEvent>(RoomEngineObjectEvent.SELECTED, event => 
    {
        if (!userProfile) return;

        if (event.category !== RoomObjectCategory.UNIT) return;

        const userData = GetRoomSession().userDataManager.getUserDataByIndex(event.objectId);

        if (userData.type !== RoomObjectType.USER) return;

        GetUserProfile(userData.webID);
    });

    if (!userProfile) return null;

    return (
        <NitroCardView uniqueKey="nitro-user-profile" theme="primary-slim" className="user-profile">
            <NitroCardHeaderView headerText={ LocalizeText('extendedprofile.caption') } onCloseClick={ onClose } />
            <NitroCardContentView overflow="hidden">
                <Grid fullHeight={ false } gap={ 2 }>
                    <Column size={ 7 } gap={ 1 } className="user-container pe-2">
                        <UserContainerView userProfile={ userProfile } />
                    </Column>
                    <Column size={ 5 }>

                        <RoleplayStatsView userID={ userProfile.id } />
                        { userRelationships &&
                            <FriendsContainerView relationships={ userRelationships } friendsCount={ userProfile.friendsCount } /> }
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView>
    )
}
