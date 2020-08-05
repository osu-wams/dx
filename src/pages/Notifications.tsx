import React from 'react';
import { Loading } from 'src/ui/Loading';
import styled, { ThemeContext } from 'styled-components/macro';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion';
import '@reach/accordion/styles.css';
import { faCircle, faChevronCircleRight } from '@fortawesome/pro-light-svg-icons';
import { spacing, MainGridWrapper, MainGrid, breakpoints, fontSize, borderRadius } from 'src/theme';
import { Types } from '@osu-wams/lib';
import PageTitle from 'src/ui/PageTitle';
import VisuallyHidden from '@reach/visually-hidden';
import Icon from 'src/ui/Icon';
import { useMessages } from '@osu-wams/hooks';
import { format } from 'src/util/helpers';

const Notifications = () => {
  const themeContext = React.useContext(ThemeContext);
  const notifications = useMessages();

  type NotiType = 'unread' | 'read';
  // default to read
  // We might eventually support more message states and have different icons
  const IndicatorIcon: React.FC<{ type?: NotiType }> = ({ type = 'read' }) => {
    let iIcon = faCircle;
    let text = 'Opened previously: ';
    let iColor = themeContext.notification.indicator.read;

    if (type === 'unread') {
      iIcon = faChevronCircleRight;
      text = 'New: ';
      iColor = themeContext.notification.indicator.unread;
    }
    return (
      <span>
        <Icon icon={iIcon} color={iColor} fontSize="12px" />
        <VisuallyHidden>{text}</VisuallyHidden>
      </span>
    );
  };

  return (
    <MainGridWrapper>
      <PageTitle title="Notifications" />
      <MainGrid>
        {notifications.loading && <Loading lines={5} />}
        {notifications.data.items.length > 0 && (
          <Accordion>
            {notifications.data.items.map((n: Types.UserMessage) => (
              <DXAccordionItem key={n.messageId}>
                <h2>
                  <DXAccordionButton>
                    {n.status !== 'READ' ? <IndicatorIcon type="unread" /> : <IndicatorIcon />}
                    <NotificationTitle>{n.title}</NotificationTitle>
                    <NotificationDate>{n.deliveredAt && format(n?.deliveredAt)}</NotificationDate>
                  </DXAccordionButton>
                </h2>
                <DXAccordionPanel>{n.content}</DXAccordionPanel>
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
    margin-bottom: ${spacing.desktop};
  }
  h2 {
    font-size: ${fontSize[16]};
    margin: 0;
    padding: ${spacing.medium} ${spacing.small};
  }
`;

const NotificationDate = styled.span`
  font-size: ${fontSize[14]};
  min-width: 90px;
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
  align-items: center;
  width: 100%;
`;

const DXAccordionPanel = styled(AccordionPanel)`
  font-size: ${fontSize[14]};
  padding: 0 ${spacing.default} ${spacing.default} ${spacing.xl};
`;

export default Notifications;
