import { HabboWebTools, ILinkEventTracker, RoomSessionEvent } from '@nitrots/nitro-renderer';
import { FC, useEffect, useState } from 'react';
import { AddEventLinkTracker, GetCommunication, RemoveLinkEventTracker } from '../../api';
import { Base, TransitionAnimation, TransitionAnimationTypes } from '../../common';
import { useRoomSessionManagerEvent } from '../../hooks';
import { AvatarEditorView } from '../avatar-editor/AvatarEditorView';
import { CameraWidgetView } from '../camera/CameraWidgetView';
import { CatalogView } from '../catalog/CatalogView';
import { FloorplanEditorView } from '../floorplan-editor/FloorplanEditorView';
import { FriendsView } from '../friends/FriendsView';
import { HotelView } from '../hotel-view/HotelView';
import { InventoryView } from '../inventory/InventoryView';
import { ModToolsView } from '../mod-tools/ModToolsView';
import { NavigatorView } from '../navigator/NavigatorView';
import { NitropediaView } from '../nitropedia/NitropediaView';
import { RightSideView } from '../right-side/RightSideView';
import { RoomView } from '../room/RoomView';
import { ToolbarView } from '../toolbar/ToolbarView';
import { UserProfileView } from '../user-profile/UserProfileView';
import { UserSettingsView } from '../user-settings/UserSettingsView';
import { WiredView } from '../wired/WiredView';

export const MainView: FC<{}> = () => 
{
    const [ landingViewVisible, setLandingViewVisible ] = useState(true);

    useRoomSessionManagerEvent<RoomSessionEvent>(RoomSessionEvent.CREATED, event => setLandingViewVisible(false));
    useRoomSessionManagerEvent<RoomSessionEvent>(RoomSessionEvent.ENDED, event => setLandingViewVisible(event.openLandingView));

    useEffect(() => 
    {
        GetCommunication().connection.onReady();
    }, []);

    useEffect(() => 
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => 
            {
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1]) 
                {
                    case 'open':
                        if (parts.length > 2) 
                        {
                            const name = parts[2];
                            return HabboWebTools.openHabblet(name);
                        }
                        return;
                }
            },
            eventUrlPrefix: 'habblet/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    return (
        <Base fit>
            <TransitionAnimation type={ TransitionAnimationTypes.FADE_IN } inProp={ landingViewVisible } timeout={ 300 }>
                <HotelView />
            </TransitionAnimation>
            <ToolbarView isInRoom={ !landingViewVisible } />
            <ModToolsView />
            <RoomView />
            <WiredView />
            <AvatarEditorView />
            <NavigatorView />
            <InventoryView />
            <CatalogView />
            <FriendsView />
            <RightSideView />
            <UserSettingsView />
            <UserProfileView />
            <CameraWidgetView />
            <NitropediaView />
            <FloorplanEditorView />
        </Base>
    );
}
