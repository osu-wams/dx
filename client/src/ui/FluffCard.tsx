import React, { useState, useEffect } from 'react';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';
import { useSwipeable, Swipeable } from 'react-swipeable';
import { CardBase } from './Card';
import Icon from '../ui/Icon';
import { Color, theme } from '../theme';
import useMediaQuery from '../util/useMediaQuery';

const FluffCardWrapper = styled(CardBase)`
  background-color: ${Color['stratosphere-100']};
  padding: ${theme.spacing.unit * 2}px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FluffCardTitle = styled.div`
  color: ${Color['stratosphere-600']};
  font-size: ${theme.fontSize['18']};
  font-weight: 600;
`;

const FluffCardText = styled.div`
  color: ${Color['stratosphere-500']};
  font-size: ${theme.fontSize['16']};
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

const FluffCardClickableIcon = styled.div`
  display: inline;
  cursor: pointer;
`;

const CarouselButton = styled.button<{ active: boolean }>`
  outline: none;
  border: 1px solid ${Color['stratosphere-200']};
  padding: 0;
  margin: 4px;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${props =>
    props.active ? Color['stratosphere-400'] : Color['stratosphere-100']};
`;

const FluffCardContent = ({ item }) => (
  <FluffCardContentWrapper>
    <FluffCardBody>
      <FluffCardTitle>{item.title}</FluffCardTitle>
      <FluffCardText>{item.text}</FluffCardText>
    </FluffCardBody>
  </FluffCardContentWrapper>
);

const FluffCard = ({ items }) => {
  // Set up some state for keeping track of which item to display
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const isMobile = !useMediaQuery('(min-width: 768px)');

  const startTimer = () => {
    setTimer(
      window.setInterval(() => {
        setCurrentItemIndex(currentItemIndex => (currentItemIndex + 1) % items.length);
      }, 5000)
    );
  };

  useEffect(() => {
    startTimer();
    return () => window.clearInterval(timer);
  }, []);

  return (
    <FluffCardWrapper>
      {isMobile && (
        <Swipeable
          onSwipedLeft={() => {
            setCurrentItemIndex(currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1);
            clearInterval(timer);
            startTimer();
          }}
          onSwipedRight={() => {
            setCurrentItemIndex((currentItemIndex + 1) % items.length);
            clearInterval(timer);
            startTimer();
          }}
        >
          <FluffCardContent item={items[currentItemIndex]} />
        </Swipeable>
      )}
      {!isMobile && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FluffCardClickableIcon
            onClick={() => {
              setCurrentItemIndex(currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1);
              clearInterval(timer);
              startTimer();
            }}
          >
            <Icon icon={faChevronCircleLeft} color={Color['stratosphere-400']} size="2x" />
          </FluffCardClickableIcon>
          <FluffCardContent item={items[currentItemIndex]} />
          <FluffCardClickableIcon
            onClick={() => {
              setCurrentItemIndex((currentItemIndex + 1) % items.length);
              clearInterval(timer);
              startTimer();
            }}
          >
            <Icon icon={faChevronCircleRight} color={Color['stratosphere-400']} size="2x" />
          </FluffCardClickableIcon>
        </div>
      )}
      <CarouselButtons>
        {items.map((item, index) => (
          <CarouselButton
            key={index}
            onClick={() => {
              setCurrentItemIndex(index);
              clearInterval(timer);
              startTimer();
            }}
            active={index === currentItemIndex}
          />
        ))}
      </CarouselButtons>
    </FluffCardWrapper>
  );
};

export default FluffCard;
