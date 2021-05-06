import React from 'react';
import styled from 'styled-components/macro';
import { Accordion, AccordionItem } from '@reach/accordion';
import '@reach/accordion/styles.css';
import { spacing, MainGridWrapper, MainGrid, breakpoints, fontSize, borderRadius } from 'src/theme';
import PageTitle from 'src/ui/PageTitle';
import { State, User } from '@osu-wams/hooks';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { markNotificationRead } from 'src/features/notifications/notifications-utils';
import { Notification } from 'src/features/notifications/Notification';

const { filteredNotifications, userMessagesState } = State;

const Notifications = () => {
  const notifications = useRecoilValue(filteredNotifications('all'));
  const setNotifications = useSetRecoilState(userMessagesState);

  // Updates the first message as read in the DB
  React.useEffect(() => {
    if (notifications.data.length > 0 && notifications.data[0].status !== 'READ') {
      User.updateUserMessage({ messageId: notifications.data[0].messageId, status: 'READ' }).then(
        () => {
          setNotifications((state) => markNotificationRead(state, notifications.data[0].messageId));
        }
      );
    }
  }, [notifications]);

  return (
    <MainGridWrapper>
      <PageTitle title="Notifications" />
      <MainGrid>
        {notifications.data.length > 0 && (
          <Accordion multiple collapsible defaultIndex={0}>
            {notifications.data.map((n) => (
              <DXAccordionItem key={n.messageId}>
                <Notification n={n} notifications={notifications} />
              </DXAccordionItem>
            ))}
          </Accordion>
        )}
      </MainGrid>
    </MainGridWrapper>
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

export default Notifications;
