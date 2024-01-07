import { BadgePointLimitsEvent, ILinkEventTracker, IRoomSession, RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomPreviewer, RoomSessionEvent } from '@nitrots/nitro-renderer';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { AddEventLinkTracker, GetLocalization, GetRoomEngine, isObjectMoverRequested, LocalizeText, RemoveLinkEventTracker, setObjectMoverRequested, UnseenItemCategory } from '../../api';
import { NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView } from '../../common';
import { useInventoryTrade, useMessageEvent, useRoomEngineEvent, useRoomSessionManagerEvent } from '../../hooks';
import { InventoryBadgeView } from './views/badge/InventoryBadgeView';
import { InventoryBotView } from './views/bot/InventoryBotView';
import { InventoryFurnitureView } from './views/furniture/InventoryFurnitureView';
import { InventoryTradeView } from './views/furniture/InventoryTradeView';
import { InventoryPetView } from './views/pet/InventoryPetView';
import { InventoryArmoryView } from './views/armory/InventoryArmoryView';

interface InventoryTab {
    label: ReactNode;
    value: string;
    children: () => ReactNode;
}

export function InventoryView() 
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ roomSession, setRoomSession ] = useState<IRoomSession>(null);
    const [ roomPreviewer, setRoomPreviewer ] = useState<RoomPreviewer>(null);
    const { isTrading = false, stopTrading = null } = useInventoryTrade();

    const INVENTORY_TABS: InventoryTab[] = useMemo(() => [
        {
            label: 'Armory',
            value: 'inventory.armory',
            children: () => <InventoryArmoryView />,
        },
        {
            label: 'Furniture',
            value: 'inventory.furni',
            children: () => <InventoryFurnitureView roomSession={ roomSession } roomPreviewer={ roomPreviewer } />
        },
        {
            label: 'Bots',
            value: 'inventory.bots',
            children: () => <InventoryBotView roomSession={ roomSession } roomPreviewer={ roomPreviewer } />
        },
        {
            label: 'Pets',
            value: 'inventory.furni.tab.pets',
            children: () => <InventoryPetView roomSession={ roomSession } roomPreviewer={ roomPreviewer } />,
        },
        {
            label: 'Badges',
            value: 'inventory.badges',
            children: () => <InventoryBadgeView />
        },
    ], [ roomSession, roomPreviewer ]);

    const [ currentTab, setCurrentTab ] = useState<InventoryTab>(INVENTORY_TABS[0]);

    const renderedTab = useMemo(() => <currentTab.children />, [ currentTab ]);

    const onClose = () => 
    {
        if (isTrading) stopTrading();

        setIsVisible(false);
    }

    useRoomEngineEvent<RoomEngineObjectPlacedEvent>(RoomEngineObjectEvent.PLACED, event => 
    {
        if (!isObjectMoverRequested()) return;

        setObjectMoverRequested(false);

        if (!event.placedInRoom) setIsVisible(true);
    });

    useRoomSessionManagerEvent<RoomSessionEvent>([
        RoomSessionEvent.CREATED,
        RoomSessionEvent.ENDED
    ], event => 
    {
        switch (event.type) 
        {
            case RoomSessionEvent.CREATED:
                setRoomSession(event.session);
                return;
            case RoomSessionEvent.ENDED:
                setRoomSession(null);
                setIsVisible(false);
                return;
        }
    });

    useMessageEvent<BadgePointLimitsEvent>(BadgePointLimitsEvent, event => 
    {
        const parser = event.getParser();

        for (const data of parser.data) GetLocalization().setBadgePointLimit(data.badgeId, data.limit);
    });

    useEffect(() => 
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => 
            {
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1]) 
                {
                    case 'show':
                        setIsVisible(true);
                        return;
                    case 'hide':
                        setIsVisible(false);
                        return;
                    case 'toggle':
                        setIsVisible(prevValue => !prevValue);
                        return;
                }
            },
            eventUrlPrefix: 'inventory/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    useEffect(() => 
    {
        setRoomPreviewer(new RoomPreviewer(GetRoomEngine(), ++RoomPreviewer.PREVIEW_COUNTER));

        return () => 
        {
            setRoomPreviewer(prevValue => 
            {
                prevValue.dispose();

                return null;
            });
        }
    }, []);

    useEffect(() => 
    {
        if (!isVisible && isTrading) setIsVisible(true);
    }, [ isVisible, isTrading ]);

    if (!isVisible) return null;

    return (
        <NitroCardView uniqueKey={ 'inventory' } className="nitro-inventory" theme={ isTrading ? 'primary-slim' : '' } >
            <NitroCardHeaderView headerText={ LocalizeText('inventory.title') } onCloseClick={ onClose } />
            { !isTrading &&
                <>
                    <NitroCardTabsView>
                        { INVENTORY_TABS.map(_ => 
                        {
                            return (
                                <NitroCardTabsItemView key={ `inventory_tab_${ _.value }` } isActive={ currentTab.value === _.value } onClick={ event => setCurrentTab(_) }>
                                    { _.label }
                                </NitroCardTabsItemView>
                            );
                        }) }
                    </NitroCardTabsView>
                    <NitroCardContentView>
                        { renderedTab }
                    </NitroCardContentView>
                </> }
            { isTrading &&
                <NitroCardContentView>
                    <InventoryTradeView cancelTrade={ onClose } />
                </NitroCardContentView> }
        </NitroCardView>
    );
}
