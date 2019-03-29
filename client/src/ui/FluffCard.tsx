/* eslint-disable no-use-before-define */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { faArrowLeft, faArrowRight, faLongArrowRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { Swipeable } from 'react-swipeable';
import { CardBase } from './Card';
import Icon from '../ui/Icon';
import { Color, theme } from '../theme';
import useMediaQuery from '../util/useMediaQuery';
import { getAnnouncements } from '../api/announcements';
import Button from '../ui/Button';

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

const FluffCardTitle = styled.div`
  font-size: ${theme.fontSize['18']};
  font-weight: 600;
`;

const FluffCardText = styled.div`
  font-size: ${theme.fontSize['16']};
  margin-bottom: ${theme.spacing.unit * 2}px;
`;

const FluffCardWrapper = styled(CardBase)<{ imageUrl: string | null }>`
  color: ${Color['neutral-600']};
  background-color: ${Color.white};
  padding: ${theme.spacing.unit * 2}px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  & ${FluffCardTitle} {
    color: ${Color['neutral-700']};
  }
  & ${FluffCardText} {
    color: ${Color['neutral-600']};
  }
  ${props => {
    if (props.imageUrl) {
      return `
        color: ${Color.white};
        background:
          /* top, transparent black, faked with gradient */ 
          linear-gradient(
            rgba(0, 0, 0, 0.55), 
            rgba(0, 0, 0, 0.55)
          ),
          /* bottom, image */
          url(${props.imageUrl}) no-repeat center;
        background-size: cover;
        & ${FluffCardTitle} {
          color: ${Color.white}
        }
        & ${FluffCardText} {
          color: ${Color.white}
        }
      `;
    }
  }}
`;

const CarouselButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const FluffCardContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const FluffCardBody = styled.div`
  padding: 1.5rem;
  flex: 2;
  text-align: left;
`;

const FluffCardClickableIcon = styled(Button)`
  background: transparent;
  font-size: ${theme.fontSize['12']};
  margin: ${theme.spacing.unit * 2}px;
`;

const CarouselButton = styled.button<{ active: boolean }>`
  outline: none;
  border: 1px solid ${props => (props.active ? Color['neutral-500'] : Color['neutral-300'])};
  padding: 0;
  margin: 4px;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${props => (props.active ? Color['neutral-300'] : Color['neutral-200'])};
`;

const FluffCardContent = ({ item }) => {
  if (!item) {
    return null;
  }

  const announcementAction =
    item.attributes && item.attributes.field_announcement_action
      ? item.attributes.field_announcement_action
      : null;

  return (
    <FluffCardContentWrapper>
      <FluffCardBody aria-live="polite">
        <FluffCardTitle>{item.attributes.title}</FluffCardTitle>
        <FluffCardText>{item.attributes.field_announcement_body}</FluffCardText>
        {announcementAction && (
          <ButtonWithIcon href={announcementAction.uri}>
            {item.attributes.field_announcement_action.title}
            <Icon icon={faLongArrowRight} color={Color.white} />
          </ButtonWithIcon>
        )}
      </FluffCardBody>
    </FluffCardContentWrapper>
  );
};

const FluffCard = () => {
  // Set up some state for keeping track of which item to display
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [items, setItems] = useState<any>([]);
  const isMobile = !useMediaQuery('(min-width: 768px)');

  // Fetch data on load
  useEffect(() => {
    getAnnouncements()
      .then(data => {
        setItems(data);
      })
      .catch(console.log);
  }, []);

  const showNextItem = useCallback(() => {
    setCurrentItemIndex(currentItemIndex => (currentItemIndex + 1) % items.length);
  }, [items]);

  const showPrevItem = useCallback(() => {
    setCurrentItemIndex(currentItemIndex => (currentItemIndex + items.length - 1) % items.length);
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <div>
      {isMobile && (
        <Swipeable
          onSwipedLeft={() => {
            showPrevItem();
          }}
          onSwipedRight={() => {
            showNextItem();
          }}
        >
          <FluffCardWrapper imageUrl={items[currentItemIndex].attributes.background_image}>
            <FluffCardContent item={items[currentItemIndex]} />
          </FluffCardWrapper>
        </Swipeable>
      )}
      {!isMobile && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FluffCardClickableIcon
            aria-label="previous announcement"
            onClick={() => {
              showPrevItem();
            }}
          >
            <Icon icon={faArrowLeft} color={Color['neutral-600']} size="2x" />
          </FluffCardClickableIcon>
          <FluffCardWrapper imageUrl={items[currentItemIndex].attributes.background_image}>
            <FluffCardContent item={items[currentItemIndex]} />
          </FluffCardWrapper>
          <FluffCardClickableIcon
            aria-label="next announcement"
            onClick={() => {
              showNextItem();
            }}
          >
            <Icon icon={faArrowRight} color={Color['neutral-600']} size="2x" />
          </FluffCardClickableIcon>
        </div>
      )}
      <CarouselButtons>
        {items.map((item, index) => (
          <CarouselButton
            aria-label={item.attributes.title}
            key={index}
            onClick={() => {
              setCurrentItemIndex(index);
            }}
            active={index === currentItemIndex}
          />
        ))}
      </CarouselButtons>
    </div>
  );
};

export default FluffCard;
