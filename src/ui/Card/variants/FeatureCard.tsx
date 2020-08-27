import styled from 'styled-components/macro';
import { CardButtonBase } from 'src/ui/Card';
import { spacing, mq, fontSize } from 'src/theme';

type Featured = {
  featured?: boolean;
};

const FeatureCard = styled(CardButtonBase)<Featured>(
  () => ({
    border: 'none',
    padding: '0',
    textAlign: 'left',
    flexBasis: '100%',
    img: {
      width: '100%',
    },
  }),
  ({ featured }) =>
    featured && {
      // iPad mini 2 columns
      [mq.xs]: {
        flexBasis: '48%',
        marginLeft: '2%',
        '&:nth-child(2n+1)': {
          marginLeft: '0',
        },
      },
      // regular iPad desktop 3 columns
      [mq.small]: {
        flexBasis: '32%',
        marginLeft: '2%',
        marginRight: '0',
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
  color: ${({ theme }) => theme.ui.featuredCard.title.color};
  margin: 0;
  font-size: ${fontSize[18]};
  font-weight: normal;
  padding: ${spacing.default} ${spacing.default} 0;
`;

const FeatureCardContent = styled.div`
  color: ${({ theme }) => theme.ui.featuredCard.content.color};
  padding: 0 ${spacing.default} ${spacing.default};
  font-size: ${fontSize[14]};
`;

/**
 * Supported in all our browsers despite -webkit only prefix.
 * cuts the text after the second line and replaces it with ellipsis
 */
const FeatureCardCompact = styled(CardButtonBase)`
  border: none;
  padding: 0;
  text-align: left;
  margin-bottom: 0 !important;
  box-shadow: none;
  ${FeatureCardContent} {
    & > p,
    & > div,
    & > ul {
      margin-top: 4px;
      margin-bottom: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: 'ellipsis';
    }
  }
`;

export { FeatureCard, FeatureCardCompact, FeatureCardGrid, FeatureCardContent, FeatureCardHeader };
