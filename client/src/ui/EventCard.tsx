import React from 'react';
import { faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { CardBase } from './Card';
import Icon from './Icon';
import { Color, theme } from '../theme';
import Button from './Button';

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
`;

const EventCardTitle = styled.div`
  & > svg {
    margin-left: ${theme.spacing.unit * 2}px;
  }
  font-size: ${theme.fontSize['18']};
  font-weight: 600;
`;

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
        <EventCardBody href={item.action.link} target="_blank">
          <EventCardTitle aria-live="polite">{item.title}</EventCardTitle>
        </EventCardBody>
      )}
      {item.body && (
        <EventCardBody as="div">
          <EventCardTitle aria-live="polite">{item.title}</EventCardTitle>
          <EventCardText>{item.body}</EventCardText>
          <>
            {item.action.title && (
              <ButtonWithIcon fg={Color.white} href={item.action.link} target="_blank">
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
