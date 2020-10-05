import React, { useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { queryCache } from 'react-query';
import { Link } from '@reach/router';
import { Menu, MenuPopover, MenuItem, MenuLink } from '@reach/menu-button';
import { faBell } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { HeaderNavButton, HeaderNavList } from './HeaderNavStyles';
import { Event } from 'src/util/gaTracking';
import { EmptyState, EmptyStateText } from 'src/ui/EmptyStates';
import MyDialog from 'src/ui/MyDialog';
import { CloseButton } from 'src/ui/Button';
import { User, useMessages } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { InternalLink } from 'src/ui/Link';
import { spacing, breakpoints, fontSize } from 'src/theme';
import Icon from 'src/ui/Icon';
import { format } from 'src/util/helpers';
import { filteredNotifications, userMessagesState } from 'src/state/application';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const Dismiss = styled.button`
  border: none;
  background-color: transparent;
  padding: ${spacing.small} ${spacing.small} ${spacing.small} ${spacing.medium};
  margin: 0 0 0 ${spacing.medium};
  font-size: ${fontSize[14]};
  color: ${({ theme }) => theme.header.headerNavList.notifications.dismiss};
`;

const Date = styled.div`
  margin-top: ${spacing.xs};
  font-size: ${fontSize[14]};
  color: ${({ theme }) => theme.notification.date};
`;

const NotificationTitle = styled.div`
  width: 180px;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: 'ellipsis';
  @media (min-width: ${breakpoints.small}) {
    width: 300px;
  }
`;

const Indicator = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.notification.indicator.unread};
  height: 8px;
  width: 8px;
  margin: 7px 12px 0 0;
`;

const NotificationAll = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: ${fontSize[16]};
  padding-right: ${spacing.default};
`;

const NotificationsMenu = () => {
  const notifications = useRecoilValue<Types.UserMessage[]>(filteredNotifications('unread'));
  const notificationsHook = useMessages();
  const setNotifications = useSetRecoilState(userMessagesState);

  const [showDialog, setShowDialog] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Types.UserMessage | null>(null);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const themeContext = React.useContext(ThemeContext);

  useEffect(() => {
    // Initial data setting to local state
    const { data, isLoading, isSuccess } = notificationsHook;
    if (data && data.items.length > 0) {
      setNotifications(() => ({
        data: data.items,
        isLoading,
        isSuccess,
      }));
    }
  }, [notificationsHook.data]);

  const NotificationsLink = (onClick) => (
    <NotificationAll>
      <InternalLink
        to={'notifications'}
        onClick={() => {
          Event('header', 'notifications-button-menu', `See all notifications page link`);
          onClick();
        }}
        fg={themeContext.ui.link.icon.internal.color}
      >
        See all notifications
      </InternalLink>
    </NotificationAll>
  );

  const EmptyNotifications = () => (
    <EmptyState>
      <MenuPopover>
        <HeaderNavList style={{ minWidth: '300px', textAlign: 'center' }}>
          <EmptyStateText>You have no new notifications.</EmptyStateText>
          <NotificationsLink />
        </HeaderNavList>
      </MenuPopover>
    </EmptyState>
  );

  const dismissNotification = (m: Types.UserMessage) => {
    User.updateUserMessage({ messageId: m.messageId, status: 'READ' }).then(() => {
      queryCache.invalidateQueries('userMessages'); // destroy cache so it doesn't conflict with local state

      // Local State Update
      setNotifications((prevState: any) => {
        const newNotifications = prevState.data.map((noti) => {
          if (m.messageId === noti.messageId) {
            return {
              ...noti,
              status: 'READ',
            };
          } else {
            return noti;
          }
        });
        return {
          data: newNotifications,
          isLoading: prevState.isLoading,
          isSuccess: prevState.isSuccess,
        };
      });
    });
  };

  return (
    <Menu>
      <HeaderNavButton
        onClick={() => Event('header', 'notifications-button-menu', 'Notifications menu expanded')}
      >
        <span style={{ position: 'relative' }}>
          {notifications.length > 0 ? (
            <Icon icon={faBell} size="lg" count={notifications.length} top />
          ) : (
            <Icon icon={faBell} size="lg" />
          )}
        </span>
        <VisuallyHidden>Notifications</VisuallyHidden>
      </HeaderNavButton>
      <MenuPopover>
        <div>
          {notifications.length === 0 && <EmptyNotifications />}
          {notifications.length > 0 && (
            <HeaderNavList>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                }}
              >
                <h2 style={{ fontSize: '16px', fontWeight: 'normal', margin: '0' }}>
                  <Icon icon={faBell} size="lg" /> Notifications ({notifications.length})
                </h2>
                <MenuLink
                  as={Link}
                  to="/notifications"
                  onClick={() =>
                    Event('header', 'notifications-button-menu', `See all notifications page link`)
                  }
                  style={{ color: themeContext.ui.link.icon.internal.color, padding: 0 }}
                >
                  View all <VisuallyHidden>notifications</VisuallyHidden>
                </MenuLink>
              </div>

              {notifications.map((m: Types.UserMessage, index) => (
                <MenuItem
                  key={m.messageId}
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  onSelect={() => {
                    setSelectedNotification(m);
                  }}
                >
                  <Indicator />
                  <div>
                    <NotificationTitle>{m.title}</NotificationTitle>
                    {m.deliveredAt && <Date>{format(m.deliveredAt, "MMM do 'at' h a")}</Date>}
                  </div>
                  <Dismiss
                    onMouseUp={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      dismissNotification(m);
                    }}
                    onKeyDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      dismissNotification(m);
                    }}
                  >
                    Dismiss <VisuallyHidden>{m.title}</VisuallyHidden>
                  </Dismiss>
                </MenuItem>
              ))}
              {showDialog && selectedNotification && (
                <MyDialog isOpen={showDialog} onDismiss={close} aria-labelledby="message-title">
                  <CloseButton onClick={close} />
                  <h2 id="message-title" style={{ fontSize: fontSize[18] }}>
                    {selectedNotification.title}
                  </h2>
                  <p>{selectedNotification.content}</p>
                  <NotificationsLink onClick={close} />
                </MyDialog>
              )}
            </HeaderNavList>
          )}
        </div>
      </MenuPopover>
    </Menu>
  );
};

export { NotificationsMenu };
