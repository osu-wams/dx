import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    getMealPlans()
      .then(res => {
        setMealPlans(res);
      })
      .catch(console.log);
  }, []);

  // If no meal plans it returns an empty array, we check for both
  if (mealPlans && mealPlans.length) {
    return (
      <Highlight>
        <HighlightTitle>{mealPlans[0].attributes.mealPlan}</HighlightTitle>
        <HighlightEmphasis color={Color['pine-400']}>
          {formatDollars(mealPlans[0].attributes.balance)}
        </HighlightEmphasis>
        <HighlightDescription>
          <ExternalLink fg={Color['pine-400']} href="http://mycard.oregonstate.edu/">
            View and Add Balance
          </ExternalLink>
        </HighlightDescription>
      </Highlight>
    );
  }
  return (
    <Highlight>
      <HighlightTitle>No meal plans</HighlightTitle>
    </Highlight>
  );
};

export default MealPlans;
