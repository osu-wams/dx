import React from 'react';
import { Menu, MenuLink, MenuPopover } from '@reach/menu-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faChevronDown } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { HeaderNavButton, HeaderNavText, HeaderNavList } from './HeaderNavStyles';
import { Event } from 'src/util/gaTracking';
import { Mobile, Desktop } from 'src/util/useMediaQuery';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';
import emptyNotificationsImg from 'src/assets/empty-notifications.svg';

const tempMock = [
  {
    channelId: 'dashboard',
    content: 'This is a mocked message for you to see.',
    contentShort: 'This is a mocked message for you to see with a long title to break things',
    deliveredAt: '2020-04-20',
    messageId: 'message-b0b-r0ss-id',
    osuId: '111111111',
    sendAt: '2020-04-20',
    status: 'SENT',
  },
  {
    channelId: 'dashboard',
    content: 'This is another mocked message for you to see, this is the long content here.',
    contentShort: 'This 2nd mock message',
    deliveredAt: '2020-04-20',
    messageId: 'message-b0b-r0ss-id',
    osuId: '111111111',
    sendAt: '2020-04-20',
    status: 'SENT',
  },
];

const NotificationsMenu = () => {
  const [notifications, setNotifications] = React.useState([]);

  const EmptyNotifications = () => (
    <EmptyState>
      <HeaderNavList style={{ minWidth: '300px', textAlign: 'center' }}>
        <EmptyStateImage src={emptyNotificationsImg} alt="" />
        <EmptyStateText>You have no new notifications.</EmptyStateText>
      </HeaderNavList>
    </EmptyState>
  );

  return (
    <Menu>
      <HeaderNavButton
        onClick={() => Event('header', 'notifications-button-menu', 'Notifications menu expanded')}
      >
        <FontAwesomeIcon icon={faCommentAlt} size="lg" />
        <Mobile>
          <VisuallyHidden>Notifications</VisuallyHidden>
        </Mobile>
        <Desktop>
          <HeaderNavText>Notifications</HeaderNavText>
          <FontAwesomeIcon icon={faChevronDown} size="sm" />
        </Desktop>
      </HeaderNavButton>
      <MenuPopover>{notifications?.length === 0 && <EmptyNotifications />}</MenuPopover>
    </Menu>
  );
};

export { NotificationsMenu };
