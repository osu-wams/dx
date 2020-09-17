import React from 'react';
import { Loading } from 'src/ui/Loading';
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
import { useMessages, User } from '@osu-wams/hooks';
import { format } from 'src/util/helpers';

const Notifications = () => {
  const notifications = useMessages();

  return (
    <MainGridWrapper>
      <PageTitle title="Notifications" />
      <MainGrid>
        {notifications.loading && <Loading lines={5} />}
        {notifications.data.items.length > 0 && (
          <Accordion multiple collapsible defaultIndex={0}>
            {notifications.data.items.map((n) => (
              <DXAccordionItem key={n.messageId}>
                <DXMessage n={n} />
              </DXAccordionItem>
            ))}
          </Accordion>
        )}
      </MainGrid>
    </MainGridWrapper>
  );
};

const DXMessage = ({ n }: { n: Types.UserMessage }) => {
  const { isExpanded } = useAccordionItemContext();

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
    if (m.status !== 'read') {
      User.updateUserMessage({ messageId: m.messageId, status: 'read' });
    }
  };

  return (
    <>
      <h2>
        <DXAccordionButton onClick={() => markRead(n)}>
          {n.status !== 'READ' ? <IndicatorIcon type="unread" /> : <IndicatorIcon />}
          <NotificationTitle>
            {n.title}
            <NotificationDate>
              {n.deliveredAt && format(n.deliveredAt, "'Received' MMM do 'at' h a")}
            </NotificationDate>
          </NotificationTitle>
          <Icon icon={isExpanded ? faChevronDown : faChevronUp} css={{ marginLeft: 'auto' }} />
        </DXAccordionButton>
      </h2>
      <DXAccordionPanel>{n.content}</DXAccordionPanel>
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
