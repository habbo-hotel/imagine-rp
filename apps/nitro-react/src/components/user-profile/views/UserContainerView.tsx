import { FriendlyTime, RequestFriendComposer, UserProfileParser } from '@nitrots/nitro-renderer';
import { useEffect, useState } from 'react';
import { GetSessionDataManager, LocalizeText, SendMessageComposer } from '../../../api';
import { Column, Flex, LayoutAvatarImageView, Text } from '../../../common';
import { useUserFetchOne } from '@imagine-cms/client';

interface UserContainerViewProps {
    userProfile: UserProfileParser;
}

export function UserContainerView({ userProfile = null }: UserContainerViewProps) 
{
    const fetchUser = useUserFetchOne();
    const [ requestSent, setRequestSent ] = useState(userProfile.requestSent);
    const isOwnProfile = (userProfile.id === GetSessionDataManager().userId);
    const canSendFriendRequest = !requestSent && (!isOwnProfile && !userProfile.isMyFriend && !userProfile.requestSent);

    const addFriend = () => 
    {
        setRequestSent(true);

        SendMessageComposer(new RequestFriendComposer(userProfile.username));
    }

    useEffect(() => 
    {
        setRequestSent(userProfile.requestSent);
    }, [ userProfile ])

    useEffect(() => 
    {
        if (!userProfile) 
        {
            return;
        }
        fetchUser.fetch({ id: userProfile.id });
    }, [ userProfile ]);

    return (
        <Flex gap={ 2 }>
            <Column center className="avatar-container" style={ { background: fetchUser.data?.rank?.backgroundColor } }>
                <LayoutAvatarImageView figure={ userProfile.figure } direction={ 2 } />
            </Column>
            <Column>
                <Column gap={ 0 }>
                    <Text bold>{ userProfile.username }</Text>
                    <i className={ `icon icon-pf-${ userProfile.isOnline ? 'online' : 'offline' }` } />
                </Column>
                <Column gap={ 1 }>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.created') }</b> { userProfile.registration }
                    </Text>
                    <Text small>
                        <b>{ LocalizeText('extendedprofile.last.login') }</b> { FriendlyTime.format(userProfile.secondsSinceLastVisit, '.ago', 2) }
                    </Text>
                </Column>
                <Flex gap={ 1 }>
                    <Flex alignItems="center" gap={ 1 }>
                        { canSendFriendRequest &&
                            <Text small underline pointer onClick={ addFriend }>{ LocalizeText('extendedprofile.addasafriend') }</Text> }
                        { !canSendFriendRequest &&
                            <>
                                { userProfile.isMyFriend &&
                                    <Text>{ LocalizeText('extendedprofile.friend') }</Text> }
                                { (requestSent || userProfile.requestSent) &&
                                    <Text>{ LocalizeText('extendedprofile.friendrequestsent') }</Text> }
                            </> }
                    </Flex>
                </Flex>
            </Column>
        </Flex>
    )
}
