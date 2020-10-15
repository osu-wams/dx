import React, { useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { queryCache } from 'react-query';
import { Link } from '@reach/router';
import { Menu, MenuPopover, MenuItem, MenuLink } from '@reach/menu-button';
import { faBell } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { HeaderNavButton, HeaderNavList } from './HeaderNavStyles';
import { Event } from 'src/util/gaTracking';
import { EmptyStateText } from 'src/ui/EmptyStates';
import MyDialog from 'src/ui/MyDialog';
import { CloseButton } from 'src/ui/Button';
import { User, useMessages } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { InternalLink } from 'src/ui/Link';
import { spacing, breakpoints, fontSize } from 'src/theme';
import Icon from 'src/ui/Icon';
import { format } from 'src/util/helpers';
import { filteredNotifications, userMessagesState } from 'src/state/application';
import { dismissAll } from 'src/features/notifications/notifications-utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RichTextContent } from '../RichText';

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

const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: baseline;
`;

const NotificationsMenu = () => {
  const notifications = useRecoilValue<Types.UserMessagesState>(filteredNotifications('unread'));
  const notificationsHook = useMessages({ cacheTime: 0 });
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

  const dismissNotification = (m: Types.UserMessage) => {
    User.updateUserMessage({ messageId: m.messageId, status: 'READ' }).then(() => {
      queryCache.invalidateQueries('userMessages'); // destroy cache so it doesn't conflict with local state
    });
  };

  return (
    <Menu>
      <HeaderNavButton onClick={() => Event('notifications-menu', 'open menu')}>
        <span style={{ position: 'relative' }}>
          {notifications.data.length > 0 ? (
            <Icon icon={faBell} size="lg" count={notifications.data.length} top />
          ) : (
            <Icon icon={faBell} size="lg" />
          )}
        </span>
        <VisuallyHidden>Notifications</VisuallyHidden>
      </HeaderNavButton>
      <MenuPopover>
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
              <Icon icon={faBell} size="lg" /> Notifications ({notifications.data.length})
            </h2>
            <MenuLink
              as={Link}
              to="/notifications"
              onClick={() => {
                Event('notifications-menu', `See all notifications page`);
              }}
              style={{ color: themeContext.ui.link.icon.internal.color, padding: 0 }}
            >
              View all <VisuallyHidden>notifications</VisuallyHidden>
            </MenuLink>
          </div>
          {notifications.data.length === 0 && (
            <div style={{ display: 'flex' }}>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onSelect={() => {}}
              >
                <EmptyStateText>You have no new notifications.</EmptyStateText>
              </MenuItem>
            </div>
          )}

          {notifications.data.map((m: Types.UserMessage) => (
            <div key={m.messageId} style={{ display: 'flex' }}>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  open();
                }}
                onSelect={() => {
                  setSelectedNotification(m);
                  dismissNotification(m);
                  Event('notifications-menu', 'opened notification', m.title);
                }}
              >
                <Indicator />
                <div>
                  <NotificationTitle>{m.title}</NotificationTitle>
                  {m.deliveredAt && <Date>{format(m.deliveredAt, "MMM do 'at' h a")}</Date>}
                </div>
              </MenuItem>
              <MenuItem
                onSelect={() => {
                  dismissNotification(m);
                  Event('notifications-menu', 'dismissed notification', m.title);
                }}
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
                style={{
                  fontSize: fontSize[14],
                }}
              >
                Dismiss <VisuallyHidden>{m.title}</VisuallyHidden>
              </MenuItem>
            </div>
          ))}
          {showDialog && selectedNotification && (
            <MyDialog isOpen={showDialog} onDismiss={close} aria-labelledby="message-title">
              <CloseButton onClick={close} />
              <h2 id="message-title" style={{ fontSize: fontSize[18] }}>
                {selectedNotification.title}
              </h2>
              <RichTextContent
                dangerouslySetInnerHTML={{ __html: selectedNotification.content }}
              ></RichTextContent>
              <FooterLinks>
                {selectedNotification.deliveredAt && (
                  <Date>
                    Received {format(selectedNotification.deliveredAt, "MMM do 'at' h a")}
                  </Date>
                )}
                <InternalLink
                  to={'notifications'}
                  onClick={() => {
                    Event('notifications-menu', 'modal link: See all notifications page link');
                    close();
                  }}
                  fg={themeContext.ui.link.icon.internal.color}
                >
                  See all notifications
                </InternalLink>
              </FooterLinks>
            </MyDialog>
          )}
          {notifications.data.length > 0 && (
            <MenuItem
              onSelect={() => {
                dismissAll();
                Event('notifications-menu', 'Dismiss ALL notifications');
              }}
            >
              <span style={{ marginLeft: 'auto' }}>
                Dismiss all <VisuallyHidden>notifications</VisuallyHidden>
              </span>
            </MenuItem>
          )}
        </HeaderNavList>
      </MenuPopover>
    </Menu>
  );
};

export { NotificationsMenu };
