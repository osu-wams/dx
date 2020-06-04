import React from 'react';
import styled from 'styled-components/macro';
import { Menu, MenuPopover, MenuItem } from '@reach/menu-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faChevronDown } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { HeaderNavButton, HeaderNavText, HeaderNavList } from './HeaderNavStyles';
import { Event } from 'src/util/gaTracking';
import { Mobile, Desktop } from 'src/util/useMediaQuery';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';
import emptyNotificationsImg from 'src/assets/empty-notifications.svg';
import MyDialog from 'src/ui/MyDialog';
import { CloseButton } from 'src/ui/Button';

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
    messageId: 'message-b00b-r00ss-id',
    osuId: '111111111',
    sendAt: '2020-04-20',
    status: 'SENT',
  },
];

const Badge = styled.div`
  position: absolute;
  top: 8px;
  right: -3px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.header.headerNavList.notifications.indicator};
`;

const Dismiss = styled.button`
  border: none;
  background-color: transparent;
  padding-left: 10px;
  margin-left: 10px;
  color: ${({ theme }) => theme.header.headerNavList.notifications.dismiss};
`;

const NotificationShort = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NotificationsMenu = () => {
  const [notifications, setNotifications] = React.useState(tempMock);
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

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
        <span style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faCommentAlt} size="lg" />
          {notifications?.length > 0 && <Badge />}
        </span>
        <Mobile>
          <VisuallyHidden>Notifications</VisuallyHidden>
        </Mobile>
        <Desktop>
          <HeaderNavText>Notifications</HeaderNavText>
          <FontAwesomeIcon icon={faChevronDown} size="sm" />
        </Desktop>
      </HeaderNavButton>
      <MenuPopover>
        {notifications?.length === 0 && <EmptyNotifications />}
        {notifications?.length > 0 && (
          <HeaderNavList>
            {notifications.map((n) => (
              <MenuItem
                key={n.messageId}
                onClick={(event) => {
                  event.preventDefault();
                }}
                onSelect={open}
              >
                <NotificationShort>{n.contentShort}</NotificationShort>
                <Dismiss>
                  Dismiss <VisuallyHidden>{n.contentShort}</VisuallyHidden>
                </Dismiss>
                <MyDialog isOpen={showDialog} onDismiss={close} aria-label={n.contentShort}>
                  <CloseButton onClick={close} />
                  <p>{n.content}</p>
                </MyDialog>
              </MenuItem>
            ))}
          </HeaderNavList>
        )}
      </MenuPopover>
    </Menu>
  );
};

export { NotificationsMenu };
