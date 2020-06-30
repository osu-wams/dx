import React from 'react';
import styled from 'styled-components/macro';
import { CardBase } from 'src/ui/Card';
import { spacing, mq, fontSize } from 'src/theme';

type Featured = {
  featured?: boolean;
};
const FeatureCard = styled(CardBase)<Featured>(
  () => ({
    flexBasis: '100%',
    img: {
      width: '100%',
    },
  }),
  ({ featured }) =>
    featured && {
      [mq.small]: {
        flexBasis: '32%',
        marginLeft: '2%',
        '&:nth-child(3n+1)': {
          marginLeft: '0',
        },
      },
    }
  /* 3 columns for featuredcards in desktop */
);

const FeatureCardGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: space-between;
`;

const FeatureCardHeader = styled.h2`
  margin: 0;
  font-size: ${fontSize[18]};
  font-weight: normal;
  padding: ${spacing.default} ${spacing.default} 0;
`;

const FeatureCardContent = styled.div`
  padding: 0 ${spacing.default} ${spacing.default};
  font-size: ${fontSize[14]};
`;

export { FeatureCard, FeatureCardGrid, FeatureCardContent, FeatureCardHeader };
