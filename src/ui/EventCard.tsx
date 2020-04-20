import React, { useContext } from 'react';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import styled, { ThemeContext } from 'styled-components/macro';
import { CardBase } from './Card';
import Icon from './Icon';
import { spacing, fontSize, mq } from 'src/theme';
import Button from './Button';
import { Event } from 'src/util/gaTracking';
import { format } from 'src/util/helpers';

const ButtonWithIcon = styled(Button).attrs({
  as: 'a',
})`
  :link,
  :visited,
  :hover,
  :active {
    text-decoration: none;
  }
  & > svg {
    margin-left: ${spacing.default};
  }
  align-self: flex-start;
`;

const EventCardTitle = styled.div`
  & > svg {
    margin-left: ${spacing.default};
  }
  color: ${({ theme }) => theme.ui.eventCard.title.color};
  font-size: ${fontSize['18']};
  font-weight: 600;
`;

const EventCardLargeTitle = styled.div`
  color: ${({ theme }) => theme.ui.eventCard.largeTitle.color};
  font-size: ${fontSize['24']};
  font-weight: 300;
  text-align: center;
`;

const EventCardDateStyling = styled.div`
  background: ${({ theme }) => theme.ui.eventCard.date.background};
  border: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;

  & > span:first-child {
    color: ${({ theme }) => theme.ui.eventCard.date.firstChild.color};
    font-weight: bold;
    font-size: ${fontSize[12]};
    text-transform: uppercase;
    margin-bottom: ${spacing.unit * 0.5}px;
  }

  & > span:last-child {
    color: ${({ theme }) => theme.ui.eventCard.date.lastChild.color};
    line-height: 20px;
    font-size: ${fontSize[24]};
  }
`;

const EventCardDate = ({ month, day }) => {
  return (
    <EventCardDateStyling>
      <span>{month}</span>
      <span>{day}</span>
    </EventCardDateStyling>
  );
};

const EventCardText = styled.div`
  font-size: ${fontSize['16']};
  margin-bottom: ${spacing.default};
  flex-grow: 2;
`;

const EventCardWrapper = styled(CardBase)<{ imageUrl: string | null }>(
  ({ theme }) => ({
    color: theme.ui.eventCard.color,
    backgroundColor: theme.ui.eventCard.background,
    padding: spacing.default,
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    margin: '0',
    [EventCardTitle]: {
      color: theme.ui.eventCard.title.color,
    },
    [mq.small]: {
      marginBottom: '0',
    },
  }),
  ({ theme, imageUrl }) =>
    imageUrl && {
      color: theme.ui.eventCard.image.color,
      backgroundSize: 'cover',
      background: `${theme.ui.eventCard.image.background}, url(${imageUrl})  no-repeat center`,
      [EventCardTitle]: {
        color: theme.ui.eventCard.image.title.color,
      },
    }
);

const EventCardBody = styled.a`
  :link,
  :visited,
  :hover,
  :active {
    text-decoration: none;
  }
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  flex: 2;
  text-align: left;
  justify-content: center;
`;

const EventCardContent = ({ item }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      {!item.body && (
        <EventCardBody
          href={item.action.link}
          target="_blank"
          onClick={() => Event('calendar-event', item.title, item.action.link)}
        >
          <EventCardDate month={format(item.date, 'MMM')} day={format(item.date, 'd')} />
          <EventCardLargeTitle>{item.title}</EventCardLargeTitle>
        </EventCardBody>
      )}
      {item.body && (
        <EventCardBody as="div">
          <EventCardTitle aria-live="polite">{item.title}</EventCardTitle>
          <EventCardText>{item.body}</EventCardText>
          <>
            {item.action && item.action.title && (
              <ButtonWithIcon
                fg={themeContext.ui.eventCard.button.color}
                href={item.action.link}
                onClick={() => Event('dx-event', item.title, item.action.link)}
                target="_blank"
              >
                {item.action.title}
                <Icon icon={faLongArrowRight} color={themeContext.ui.eventCard.button.icon.color} />
              </ButtonWithIcon>
            )}
          </>
        </EventCardBody>
      )}
    </>
  );
};

const EventCard = ({ itemContent }) => {
  return (
    <div data-testid="eventcard">
      <EventCardWrapper imageUrl={itemContent.bg_image}>
        <EventCardContent item={itemContent} />
      </EventCardWrapper>
    </div>
  );
};

export default EventCard;
