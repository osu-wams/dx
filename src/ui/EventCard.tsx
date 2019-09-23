import React from 'react';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { format } from 'date-fns';
import { CardBase } from './Card';
import Icon from './Icon';
import { Color, theme, breakpoints } from '../theme';
import Button from './Button';
import { Event } from '../util/gaTracking';

const ButtonWithIcon = styled(Button).attrs({
  as: 'a'
})`
  :link,
  :visited,
  :hover,
  :active {
    text-decoration: none;
  }
  & > svg {
    margin-left: ${theme.spacing.unit * 2}px;
  }
  align-self: flex-start;
`;

const EventCardTitle = styled.div`
  & > svg {
    margin-left: ${theme.spacing.unit * 2}px;
  }
  color: #fff;
  font-size: ${theme.fontSize['18']};
  font-weight: 600;
`;

const EventCardLargeTitle = styled.div`
  color: ${Color['white']};
  font-size: ${theme.fontSize['24']};
  font-weight: 300;
  text-align: center;
`;

const EventCardDateStyling = styled.div`
  background: ${Color['white']};
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
    color: ${Color['neutral-500']};
    font-weight: bold;
    font-size: ${theme.fontSize[12]};
    text-transform: uppercase;
    margin-bottom: ${theme.spacing.unit * 0.5}px;
  }

  & > span:last-child {
    color: ${Color['neutral-700']};
    line-height: 20px;
    font-size: ${theme.fontSize[24]};
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
  font-size: ${theme.fontSize['16']};
  margin-bottom: ${theme.spacing.unit * 2}px;
  flex-grow: 2;
`;

const EventCardWrapper = styled(CardBase)<{ imageUrl: string | null }>`
  color: ${Color['neutral-600']};
  background-color: ${Color.white};
  padding: ${theme.spacing.unit * 2}px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  & ${EventCardTitle} {
    color: ${Color['neutral-700']};
  }
  @media (min-width: ${breakpoints[768]}) {
    margin-bottom: 0;
  }
  ${props => {
    if (props.imageUrl) {
      return `
        color: ${Color.white};
        background:
          linear-gradient(
            rgba(0, 0, 0, 0.55), 
            rgba(0, 0, 0, 0.55)
          ),
          url(${props.imageUrl}) no-repeat center;
        background-size: cover;
        & ${EventCardTitle} {
          color: ${Color.white}
        }
      `;
    }
  }}
`;

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
  return (
    <>
      {!item.body && (
        <EventCardBody
          href={item.action.link}
          target="_blank"
          onClick={() => Event('calendar-event', item.title, item.action.link)}
        >
          <EventCardDate month={format(item.date, 'MMM')} day={format(item.date, 'D')} />
          <EventCardLargeTitle>{item.title}</EventCardLargeTitle>
        </EventCardBody>
      )}
      {item.body && (
        <EventCardBody as="div">
          <EventCardTitle aria-live="polite">{item.title}</EventCardTitle>
          <EventCardText>{item.body}</EventCardText>
          <>
            {item.action.title && (
              <ButtonWithIcon
                fg={Color.white}
                href={item.action.link}
                onClick={() => Event('dx-event', item.title, item.action.link)}
                target="_blank"
              >
                {item.action.title}
                <Icon icon={faLongArrowRight} color={Color.white} />
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
