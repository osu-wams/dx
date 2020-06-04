import React, { useEffect } from 'react';
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
import { useMessages, User } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';

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
  const notifications = useMessages();
  const [filteredNotifications, setFilteredNotifications] = React.useState<Types.UserMessage[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    if (notifications.data.items.length > 0) {
      setFilteredNotifications(
        notifications.data.items.filter((m: Types.UserMessage) => m.status.toLowerCase() !== 'read')
      );
    }
  }, [notifications.data]);

  const EmptyNotifications = () => (
    <EmptyState>
      <HeaderNavList style={{ minWidth: '300px', textAlign: 'center' }}>
        <EmptyStateImage src={emptyNotificationsImg} alt="" />
        <EmptyStateText>You have no new notifications.</EmptyStateText>
      </HeaderNavList>
    </EmptyState>
  );

  const dismissNotification = (m: Types.UserMessage) => {
    const status = 'read';
    const updated = User.updateUserMessage({ messageId: m.messageId, status });
    if (updated) {
      setFilteredNotifications(filteredNotifications.filter((n) => n.messageId !== m.messageId));
    }
  };

  return (
    <Menu>
      <HeaderNavButton
        onClick={() => Event('header', 'notifications-button-menu', 'Notifications menu expanded')}
      >
        <span style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faCommentAlt} size="lg" />
          {filteredNotifications.length > 0 && <Badge />}
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
        {filteredNotifications.length === 0 && <EmptyNotifications />}
        {filteredNotifications.length > 0 && (
          <HeaderNavList>
            {filteredNotifications.map((m: Types.UserMessage) => (
              <MenuItem
                key={m.messageId}
                onClick={(event) => {
                  event.preventDefault();
                  open();
                }}
                onSelect={() => {}}
              >
                <NotificationShort>{m.title}</NotificationShort>
                <Dismiss
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    dismissNotification(m);
                  }}
                >
                  Dismiss <VisuallyHidden>{m.contentShort}</VisuallyHidden>
                </Dismiss>
                <MyDialog isOpen={showDialog} onDismiss={close} aria-label={m.title}>
                  <CloseButton onClick={close} />
                  <p>{m.content}</p>
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
