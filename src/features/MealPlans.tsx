import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useMealPlans } from '../api/persons/meal-plans';
import { Color } from '../theme';
import { formatDollars } from '../util/helpers';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../ui/Highlights';
import { ExternalLink } from '../ui/Link';
import { Event } from '../util/gaTracking';

const MealPlans: React.FC = () => {
  const mealPlans = useMealPlans();

  return (
    <Highlight>
      {mealPlans.loading && (
        <HighlightTitle>
          <Skeleton count={4} />
        </HighlightTitle>
      )}
      {mealPlans && mealPlans.data.length ? (
        <>
          <HighlightTitle>{mealPlans.data[0].attributes.mealPlan}</HighlightTitle>
          <HighlightEmphasis color={Color['pine-400']}>
            {formatDollars(mealPlans.data[0].attributes.balance)}
          </HighlightEmphasis>
          <HighlightDescription>
            <ExternalLink
              fg={Color['pine-400']}
              href="http://mycard.oregonstate.edu/"
              onClick={() => Event('meal-plans', 'Add money to card - mycard link')}
            >
              View and Add Balance
            </ExternalLink>
          </HighlightDescription>
        </>
      ) : (
        !mealPlans.loading && <HighlightTitle>No meal plans</HighlightTitle>
      )}
    </Highlight>
  );
};

export default MealPlans;
