import React, { useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
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
import { InternalLink } from 'src/ui/Link';
import { spacing, MainGridWrapper, MainGrid, breakpoints, fontSize, borderRadius } from 'src/theme';

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
  padding-left: ${spacing.medium};
  margin: 0 0 0 ${spacing.medium};
  font-size: ${fontSize[14]};
  color: ${({ theme }) => theme.header.headerNavList.notifications.dismiss};
`;

const NotificationTitle = styled.div`
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: ${breakpoints.small}) {
    width: 300px;
  }
`;

const NotificationAll = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: ${fontSize[16]};
  padding-right: ${spacing.default};
`;

const NotificationsMenu = () => {
  const notifications = useMessages();
  const [filteredNotifications, setFilteredNotifications] = React.useState<Types.UserMessage[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const themeContext = React.useContext(ThemeContext);

  useEffect(() => {
    if (notifications.data.items.length > 0) {
      setFilteredNotifications(
        notifications.data.items.filter((m: Types.UserMessage) => m.status.toLowerCase() !== 'read')
      );
    }
  }, [notifications.data]);

  const NotificationsLink = () => (
    <NotificationAll>
      <InternalLink
        to={'/notifications'}
        onClick={() =>
          Event('header', 'notifications-button-menu', `See all notifications page link`)
        }
        fg={themeContext.ui.link.icon.internal.color}
      >
        See all notifications
      </InternalLink>
    </NotificationAll>
  );

  const EmptyNotifications = () => (
    <EmptyState>
      <HeaderNavList style={{ minWidth: '300px', textAlign: 'center' }}>
        <EmptyStateImage src={emptyNotificationsImg} alt="" />
        <EmptyStateText>You have no new notifications.</EmptyStateText>
        <NotificationsLink />
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
                <NotificationTitle>{m.title}</NotificationTitle>
                <Dismiss
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    dismissNotification(m);
                  }}
                >
                  Dismiss <VisuallyHidden>{m.title}</VisuallyHidden>
                </Dismiss>
                <MyDialog isOpen={showDialog} onDismiss={close} aria-labelledby="message-title">
                  <CloseButton onClick={close} />
                  <h2 id="message-title">{m.title}</h2>
                  <p>{m.content}</p>
                  <NotificationsLink />
                </MyDialog>
              </MenuItem>
            ))}
            <NotificationsLink />
          </HeaderNavList>
        )}
      </MenuPopover>
    </Menu>
  );
};

export { NotificationsMenu };
