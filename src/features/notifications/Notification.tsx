import React from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import { AccordionButton, AccordionPanel, useAccordionItemContext } from '@reach/accordion';
import '@reach/accordion/styles.css';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { spacing, fontSize } from '@osu-wams/theme';
import { Types } from '@osu-wams/lib';
import VisuallyHidden from '@reach/visually-hidden';
import Icon from 'src/ui/Icon';
import { State, User } from '@osu-wams/hooks';
import { Helpers } from '@osu-wams/utils';
import { RichTextContent } from 'src/ui/RichText';
import { Event } from 'src/util/gaTracking';
import { useSetRecoilState } from 'recoil';
import { markNotificationRead } from './notifications-utils';

export const Notification = ({
  n,
  notifications,
}: {
  n: Types.UserMessage;
  notifications: Types.UserMessagesState;
}) => {
  const { isExpanded } = useAccordionItemContext();
  const themeContext = React.useContext(ThemeContext);
  const setNotifications = useSetRecoilState(State.userMessagesState);

  type NotiType = 'unread' | 'read';
  // We might eventually support more message states and have different icons
  const IndicatorIcon: React.FC<{ type?: NotiType }> = ({ type = 'read' }) => {
    let text = 'Opened previously: ';
    let iColor = themeContext.notification.indicator.read;

    if (type === 'unread') {
      text = 'New: ';
      iColor = themeContext.notification.indicator.unread;
    }
    return (
      <span>
        <Icon icon={faCircle} color={iColor} fontSize="10px" />
        <VisuallyHidden>{text}</VisuallyHidden>
      </span>
    );
  };

  const markRead = (m: Types.UserMessage) => {
    if (m.status !== 'READ') {
      Event('notifications', `expanded (READ)`, m.title);
      User.updateUserMessage({ messageId: m.messageId, status: 'READ' }).then(() => {
        setNotifications((state) => markNotificationRead(state, m.messageId));
      });
    }
  };

  return (
    <>
      <h2>
        <DXAccordionButton onClick={() => markRead(n)}>
          {n.status !== 'READ' && notifications.data[0].messageId !== n.messageId ? (
            <IndicatorIcon type="unread" />
          ) : (
            <IndicatorIcon />
          )}
          <NotificationTitle>
            {n.title}
            <NotificationDate>
              {n.deliveredAt && Helpers.format(n.deliveredAt, "'Received' MMM do 'at' h a")}
            </NotificationDate>
          </NotificationTitle>
          <Icon icon={isExpanded ? faChevronDown : faChevronUp} css={{ marginLeft: 'auto' }} />
        </DXAccordionButton>
      </h2>
      <DXAccordionPanel>
        <RichTextContent dangerouslySetInnerHTML={{ __html: n.content }}></RichTextContent>
      </DXAccordionPanel>
    </>
  );
};

const NotificationDate = styled.div`
  font-size: ${fontSize[14]};
  margin-top: ${spacing.medium};
  color: ${({ theme }) => theme.notification.date};
`;

const NotificationTitle = styled.span`
  color: ${({ theme }) => theme.notification.title};
  flex-grow: 1;
  padding: 0 ${spacing.xm};
`;

const DXAccordionButton = styled(AccordionButton)`
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const DXAccordionPanel = styled(AccordionPanel)`
  font-size: ${fontSize[14]};
  padding: 0 ${spacing.default} ${spacing.default} ${spacing.xl};
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
