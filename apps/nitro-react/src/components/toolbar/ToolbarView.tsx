import { Dispose, DropBounce, EaseOut, JumpBy, Motions, NitroToolbarAnimateIconEvent, Queue, Wait } from '@nitrots/nitro-renderer';
import { CreateLinkEvent, GetSessionDataManager, MessengerIconState, OpenMessengerChat } from '../../api';
import { Base, Flex, LayoutAvatarImageView, LayoutItemCountView } from '../../common';
import { useFriends, useInventoryUnseenTracker, useMessenger, useRoomEngineEvent, useSessionInfo } from '../../hooks';

export function ToolbarView(props: { isInRoom: boolean }) 
{
    const { isInRoom } = props;
    const { userFigure = null } = useSessionInfo();
    const { getFullCount = 0 } = useInventoryUnseenTracker();
    const { requests = [] } = useFriends();
    const { iconState = MessengerIconState.HIDDEN } = useMessenger();
    const isMod = GetSessionDataManager().isModerator;
    useRoomEngineEvent<NitroToolbarAnimateIconEvent>(NitroToolbarAnimateIconEvent.ANIMATE_ICON, event => 
    {
        const animationIconToToolbar = (iconName: string, image: HTMLImageElement, x: number, y: number) => 
        {
            const target = (document.body.getElementsByClassName(iconName)[0] as HTMLElement);

            if (!target) return;

            image.className = 'toolbar-icon-animation';
            image.style.visibility = 'visible';
            image.style.left = (x + 'px');
            image.style.top = (y + 'px');

            document.body.append(image);

            const targetBounds = target.getBoundingClientRect();
            const imageBounds = image.getBoundingClientRect();

            const left = (imageBounds.x - targetBounds.x);
            const top = (imageBounds.y - targetBounds.y);
            const squared = Math.sqrt(((left * left) + (top * top)));
            const wait = (500 - Math.abs(((((1 / squared) * 100) * 500) * 0.5)));
            const height = 20;

            const motionName = (`ToolbarBouncing[${ iconName }]`);

            if (!Motions.getMotionByTag(motionName)) 
            {
                Motions.runMotion(new Queue(new Wait((wait + 8)), new DropBounce(target, 400, 12))).tag = motionName;
            }

            const motion = new Queue(new EaseOut(new JumpBy(image, wait, ((targetBounds.x - imageBounds.x) + height), (targetBounds.y - imageBounds.y), 100, 1), 1), new Dispose(image));

            Motions.runMotion(motion);
        }

        animationIconToToolbar('icon-inventory', event.image, event.x, event.y);
    });

    return (
        <>
            <Flex alignItems="center" justifyContent="between" gap={ 2 } className="nitro-toolbar py-1 px-3">
                <Flex gap={ 2 } alignItems="center">
                    <Flex alignItems="center" gap={ 2 }>
                        <Base pointer className="navigation-item icon icon-rooms" onClick={ () => CreateLinkEvent('navigator/toggle') } />
                        <Base pointer className="navigation-item icon icon-catalog" onClick={ () => CreateLinkEvent('catalog/toggle') } />
                        <Base pointer className="navigation-item icon icon-inventory" onClick={ () => CreateLinkEvent('inventory/toggle') }>
                            { (getFullCount > 0) &&
                                <LayoutItemCountView count={ getFullCount } /> }
                        </Base>
                        { isInRoom &&
                            <Base pointer className="navigation-item icon icon-camera" onClick={ () => CreateLinkEvent('camera/toggle') } /> }
                        { isMod &&
                            <Base pointer className="navigation-item icon icon-modtools" onClick={ () => CreateLinkEvent('mod-tools/toggle') } /> }
                    </Flex>
                    <Flex alignItems="center" id="toolbar-chat-input-container" />
                </Flex>
                <Flex alignItems="center" gap={ 2 }>
                    <Flex gap={ 2 }>
                        <Base pointer className="navigation-item icon icon-friendall" onClick={ () => CreateLinkEvent('friends/toggle') }>
                            { (requests.length > 0) &&
                                <LayoutItemCountView count={ requests.length } /> }
                        </Base>
                        { ((iconState === MessengerIconState.SHOW) || (iconState === MessengerIconState.UNREAD)) &&
                            <Base pointer className={ `navigation-item icon icon-message ${ (iconState === MessengerIconState.UNREAD) && 'is-unseen' }` } onClick={ event => OpenMessengerChat() } /> }
                    </Flex>
                    <Base id="toolbar-friend-bar-container" className="d-none d-lg-block" />
                </Flex>
            </Flex>
        </>
    );
}
