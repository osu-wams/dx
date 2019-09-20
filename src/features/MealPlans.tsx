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
import { Event } from '../util/gaTracking';

const MealPlans: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<IMealPlans[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getMealPlans()
      .then(res => {
        if (isMounted) {
          setMealPlans(res);
          setLoading(false);
        }
      })
      .catch(console.log);

    return () => {
      // prevents setting data on a component that has been unmounted before promise resolves
      isMounted = false;
    };
  }, []);

  return (
    <Highlight textAlignLeft>
      {loading && (
        <HighlightTitle>
          <Skeleton count={4} />
        </HighlightTitle>
      )}
      {mealPlans && mealPlans.length ? (
        <>
          <HighlightEmphasis color={mealPlans[0].attributes.balance > 0 ? Color['pine-400'] : Color['lava-400']}>
            {formatDollars(mealPlans[0].attributes.balance)}
          </HighlightEmphasis>
          <HighlightTitle marginTop={0}>Meal Plan Balance</HighlightTitle>
          <HighlightDescription>The current balance for your UHDS or Orange Rewards meal plan.</HighlightDescription>
        </>
      ) : (
        !loading && <HighlightTitle>No meal plans</HighlightTitle>
      )}

      {/* 
        The code below puts a link in the highlight. However, due to interface design, since we want the final item's link
        to be in line with the info button in the card footer, I've put the code over in FinancialOverview.tsx

        If we added a new item to the financial overview, we'd want to uncomment the code below and remove/replace it in the
        footer on the Financial Overview card. Kinda janky but the alternative is to rewrite a handful of code for a 1-off
        scenario.
      */}
      {/* <ExternalLink
        style={{ float: 'right' }}
        fg={Color['orange-400']}
        href="http://mycard.oregonstate.edu/"
        onClick={() => Event('meal-plans', 'Add money to card - mycard link')}
      >
        Add money
      </ExternalLink> */}
    </Highlight>
  );
};

export default MealPlans;
