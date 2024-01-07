import { RoomSessionFavoriteGroupUpdateEvent, RoomSessionUserBadgesEvent, RoomSessionUserFigureUpdateEvent } from '@nitrots/nitro-renderer';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AvatarInfoUser, CloneObject, GetSessionDataManager, GetUserProfile } from '../../../../../api';
import { Column, Flex, LayoutAvatarImageView, LayoutBadgeImageView, Text, UserProfileIconView } from '../../../../../common';
import { useRoomSessionManagerEvent } from '../../../../../hooks';
import { useCorporationFetchOne, useGangFetchOne, useRPStatsFetchOne, useUserFetchOne } from '@imagine-cms/client';

interface InfoStandWidgetUserViewProps {
    avatarInfo: AvatarInfoUser;
    setAvatarInfo: Dispatch<SetStateAction<AvatarInfoUser>>;
    onClose: () => void;
}

export function InfoStandWidgetUserView({ avatarInfo = null, setAvatarInfo = null, onClose = null }: InfoStandWidgetUserViewProps) 
{
    const fetchUser = useUserFetchOne();
    const fetchRPStats = useRPStatsFetchOne();
    const fetchCorp = useCorporationFetchOne();
    const fetchGang = useGangFetchOne();

    async function refresh() 
    {
        if (!avatarInfo) 
        {
            return;
        }
        fetchUser.fetch({ id: avatarInfo.webID });
        const rpStats = await fetchRPStats.fetch({ userID: avatarInfo.webID });
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
    }, [ avatarInfo?.webID ]);

    useRoomSessionManagerEvent<RoomSessionUserBadgesEvent>(RoomSessionUserBadgesEvent.RSUBE_BADGES, event => 
    {
        if (!avatarInfo || (avatarInfo.webID !== event.userId)) return;

        const oldBadges = avatarInfo.badges.join('');

        if (oldBadges === event.badges.join('')) return;

        setAvatarInfo(prevValue => 
        {
            const newValue = CloneObject(prevValue);

            newValue.badges = event.badges;

            return newValue;
        });
    });

    useRoomSessionManagerEvent<RoomSessionUserFigureUpdateEvent>(RoomSessionUserFigureUpdateEvent.USER_FIGURE, event => 
    {
        if (!avatarInfo || (avatarInfo.roomIndex !== event.roomIndex)) return;

        setAvatarInfo(prevValue => 
        {
            const newValue = CloneObject(prevValue);

            newValue.figure = event.figure;
            newValue.motto = event.customInfo;
            newValue.achievementScore = event.activityPoints;

            return newValue;
        });
    });

    useRoomSessionManagerEvent<RoomSessionFavoriteGroupUpdateEvent>(RoomSessionFavoriteGroupUpdateEvent.FAVOURITE_GROUP_UPDATE, event => 
    {
        if (!avatarInfo || (avatarInfo.roomIndex !== event.roomIndex)) return;

        setAvatarInfo(prevValue => 
        {
            const newValue = CloneObject(prevValue);
            const clearGroup = ((event.status === -1) || (event.habboGroupId <= 0));

            newValue.groupId = clearGroup ? -1 : event.habboGroupId;
            newValue.groupName = clearGroup ? null : event.habboGroupName
            newValue.groupBadgeId = clearGroup ? null : GetSessionDataManager().getGroupBadge(event.habboGroupId);

            return newValue;
        });
    });

    if (!avatarInfo) return null;

    return (
        <Column className="nitro-infostand rounded">
            <Column overflow="visible" className="container-fluid content-area" gap={ 1 }>
                <Column gap={ 1 }>
                    <Flex alignItems="center" justifyContent="between">
                        <Flex alignItems="center" gap={ 1 }>
                            <UserProfileIconView userId={ avatarInfo.webID } />
                            <Text variant="white" small wrap>{ avatarInfo.name }</Text>
                        </Flex>
                        <FaTimes className="cursor-pointer fa-icon" onClick={ onClose } />
                    </Flex>
                    <hr className="m-0" />
                </Column>
                <Column gap={ 1 }>
                    <Flex gap={ 1 }>
                        <Column fullWidth className="body-image" onClick={ () => GetUserProfile(avatarInfo.webID) } style={ { background: fetchUser.data?.rank?.backgroundColor } }>
                            <LayoutAvatarImageView figure={ avatarInfo.figure } direction={ 4 } />
                        </Column>
                        <Column grow alignItems="center" gap={ 0 }>
                            <div>
                                <div>
                                    <h6 style={ { fontWeight: 600, margin: 0 } }>Job</h6>
                                    { fetchCorp.data && <LayoutBadgeImageView badgeCode={ fetchCorp.data.badgeCode } showInfo={ true } /> }
                                    { !fetchCorp.data && <p>Unemployed</p> }
                                </div>
                                <br />
                                <div>
                                    <h6 style={ { fontWeight: 600, margin: 0 } }>Gang</h6>
                                    { fetchGang.data && <LayoutBadgeImageView badgeCode="FAN" showInfo={ true } /> }
                                    { !fetchGang.data && <p>No gang affiliation</p> }
                                </div>
                            </div>
                        </Column>
                    </Flex>
                    <hr className="m-0" />
                </Column>
            </Column>
        </Column>
    );
}
