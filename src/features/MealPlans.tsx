import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getMealPlans, IMealPlans } from '../api/persons/meal-plans';
import { Color } from '../theme';
import { formatDollars } from '../util/helpers';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../ui/Highlights';
import { ExternalLink } from '../ui/Link';

const MealPlans: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<IMealPlans[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMealPlans()
      .then(res => {
        setMealPlans(res);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  return (
    <Highlight>
      {loading && (
        <HighlightTitle>
          <Skeleton count={4} />
        </HighlightTitle>
      )}
      {mealPlans && mealPlans.length ? (
        <>
          <HighlightTitle>{mealPlans[0].attributes.mealPlan}</HighlightTitle>
          <HighlightEmphasis color={Color['pine-400']}>
            {formatDollars(mealPlans[0].attributes.balance)}
          </HighlightEmphasis>
          <HighlightDescription>
            <ExternalLink fg={Color['pine-400']} href="http://mycard.oregonstate.edu/">
              View and Add Balance
            </ExternalLink>
          </HighlightDescription>
        </>
      ) : (
        !loading && <HighlightTitle>No meal plans</HighlightTitle>
      )}
    </Highlight>
  );
};

export default MealPlans;
