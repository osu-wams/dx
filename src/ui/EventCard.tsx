import React, { useContext } from 'react';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import { CardBase } from './Card';
import Icon from './Icon';
import { themeSettings, breakpoints, styled, ThemeContext } from '../theme';
import Button from './Button';
import { Event } from '../util/gaTracking';
import { format } from '../util/helpers';

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
    margin-left: ${themeSettings.spacing.unit * 2}px;
  }
  align-self: flex-start;
`;

const EventCardTitle = styled.div`
  & > svg {
    margin-left: ${themeSettings.spacing.unit * 2}px;
  }
  color: ${({ theme }) => theme.ui.eventCard.title.color};
  font-size: ${themeSettings.fontSize['18']};
  font-weight: 600;
`;

const EventCardLargeTitle = styled.div`
  color: ${({ theme }) => theme.ui.eventCard.largeTitle.color};
  font-size: ${themeSettings.fontSize['24']};
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
    font-size: ${themeSettings.fontSize[12]};
    text-transform: uppercase;
    margin-bottom: ${themeSettings.spacing.unit * 0.5}px;
  }

  & > span:last-child {
    color: ${({ theme }) => theme.ui.eventCard.date.lastChild.color};
    line-height: 20px;
    font-size: ${themeSettings.fontSize[24]};
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
  font-size: ${themeSettings.fontSize['16']};
  margin-bottom: ${themeSettings.spacing.unit * 2}px;
  flex-grow: 2;
`;

const EventCardWrapper = styled(CardBase)<{ imageUrl: string | null }>`
  color: ${({ theme }) => theme.ui.eventCard.color};
  background-color: ${({ theme }) => theme.ui.eventCard.background};
  padding: ${themeSettings.spacing.unit * 2}px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  & ${EventCardTitle} {
    color: ${({ theme }) => theme.ui.eventCard.title.color};
  }
  @media (min-width: ${breakpoints[768]}) {
    margin-bottom: 0;
  }
  ${props => {
    if (props.imageUrl) {
      return `
        color: ${props.theme.ui.eventCard.image.color};
        background: ${props.theme.ui.eventCard.image.background}, url(${props.imageUrl}) no-repeat center;
        background-size: cover;
        & ${EventCardTitle} {
          color: ${props.theme.ui.eventCard.image.title.color};
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
