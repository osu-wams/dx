import React, { useState } from 'react';
import styled from 'styled-components';
import { CardBase } from './Card';
import { Color, theme } from '../theme';
import { useEffect } from 'react';

const FluffCardWrapper = styled(CardBase)`
  background-color: ${Color['stratosphere-100']};
  padding: ${theme.spacing.unit * 2}px;
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

const FluffCard = ({ items }) => {
  // Set up some state for keeping track of which item to display
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [timer, setTimer] = useState<number | undefined>(undefined);

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
      <FluffCardTitle>{items[currentItemIndex].title}</FluffCardTitle>
      <FluffCardText>{items[currentItemIndex].text}</FluffCardText>
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
