import React from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useAccordionItemContext,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { spacing, MainGridWrapper, MainGrid, breakpoints, fontSize, borderRadius } from 'src/theme';
import { Types } from '@osu-wams/lib';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import Icon from 'src/ui/Icon';
import { User } from '@osu-wams/hooks';
import { format } from 'src/util/helpers';
import { RichTextContent } from 'src/ui/RichText';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { filteredNotifications, userMessagesState } from 'src/state/application';
import { queryCache } from 'react-query';

const Notifications = () => {
  const notifications = useRecoilValue(filteredNotifications('all'));

  // Updates the first message as read in the DB
  React.useEffect(() => {
    if (notifications.length > 0 && notifications[0].status !== 'READ') {
      User.updateUserMessage({ messageId: notifications[0].messageId, status: 'READ' });
    }
  }, [notifications]);

  return (
    <MainGridWrapper>
      <PageTitle title="Notifications" />
      <MainGrid>
        {notifications.length > 0 && (
          <Accordion multiple collapsible defaultIndex={0}>
            {notifications.map((n, index) => (
              <DXAccordionItem key={n.messageId}>
                <DXMessage n={n} index={index} />
              </DXAccordionItem>
            ))}
          </Accordion>
        )}
      </MainGrid>
    </MainGridWrapper>
  );
};

const DXMessage = ({ n, index }: { n: Types.UserMessage; index: number }) => {
  const { isExpanded } = useAccordionItemContext();
  const setNotifications = useSetRecoilState(userMessagesState);
  const themeContext = React.useContext(ThemeContext);

  type NotiType = 'unread' | 'read';
  // default to read
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
      User.updateUserMessage({ messageId: m.messageId, status: 'READ' }).then(() => {
        queryCache.invalidateQueries('userMessages');

        setNotifications((prevState: any) => {
          const newNotifications = prevState.data.map((noti, i) => {
            if (i === index) {
              console.log(i, index);
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
    }
  };

  return (
    <>
      <h2>
        <DXAccordionButton onClick={() => markRead(n)}>
          {n.status !== 'READ' && index !== 0 ? <IndicatorIcon type="unread" /> : <IndicatorIcon />}
          <NotificationTitle>
            {n.title}
            <NotificationDate>
              {n.deliveredAt && format(n.deliveredAt, "'Received' MMM do 'at' h a")}
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

const DXAccordionItem = styled(AccordionItem)`
  border-radius: ${borderRadius[16]};
  box-shadow: ${({ theme }) => theme.ui.card.boxShadow};
  background-color: ${({ theme }) => theme.ui.card.background};
  overflow: hidden;
  margin-bottom: ${spacing.mobile};
  @media (min-width: ${breakpoints.small}) {
    margin-bottom: ${spacing.large};
  }
  h2 {
    font-size: ${fontSize[16]};
    margin: 0;
    padding: ${spacing.medium} ${spacing.small};
  }
`;

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
`;

export default Notifications;
