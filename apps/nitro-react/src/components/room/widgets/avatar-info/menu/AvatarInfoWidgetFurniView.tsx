import { RoomObjectOperationType } from '@nitrots/nitro-renderer';
import { FaHandPaper } from 'react-icons/fa';
import { AvatarInfoFurni, ProcessRoomObjectOperation } from '../../../../../api';
import { Flex } from '../../../../../common';
import { ContextMenuHeaderView } from '../../context-menu/ContextMenuHeaderView';
import { ContextMenuListItemView } from '../../context-menu/ContextMenuListItemView';
import { ContextMenuView } from '../../context-menu/ContextMenuView';

interface AvatarInfoWidgetFurniViewProps {
    avatarInfo: AvatarInfoFurni;
    onClose: () => void;
}

export function AvatarInfoWidgetFurniView({ avatarInfo = null, onClose = null }: AvatarInfoWidgetFurniViewProps) 
{
    function processAction(name: string) 
    {
        if (name) 
        {
            switch (name) 
            {
                case 'move':
                    ProcessRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_MOVE);
                    break;
                case 'rotate':
                    ProcessRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                    break;
                case 'pickup':
                    ProcessRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_PICKUP);
                    break;
                case 'eject':
                    ProcessRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_EJECT);
                    break;
            }
        }
    }

    // TODO: Add support for interacting with furniture
    if (true) 
    {
        return null;
    }

    return (
        <ContextMenuView objectId={ avatarInfo.id } category={ avatarInfo.category } onClose={ onClose } collapsable={ true }>
            <ContextMenuHeaderView>
                { avatarInfo.name }
            </ContextMenuHeaderView>
            <Flex className="menu-list-split-3">
                <ContextMenuListItemView onClick={ () => processAction('move') }>
                    <FaHandPaper className="center fa-icon" />
                </ContextMenuListItemView>
            </Flex>
        </ContextMenuView>
    );
}
