import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getMealPlans, IMealPlans } from '../../api/persons/meal-plans';
import { Color } from '../../theme';
import { formatDollars } from '../../util/helpers';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../../ui/Highlights';
import { ExternalLink } from '../../ui/Link';
import { Event } from '../../util/gaTracking';

export const MealPlans = props => {
  const [mealPlans, setMealPlans] = useState<IMealPlans[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const MealPlanExternalLink = () => (
    <ExternalLink
      style={{ float: 'right' }}
      fg={Color['orange-400']}
      href="http://mycard.oregonstate.edu/"
      onClick={() => Event('meal-plans', 'Add money to card - mycard link')}
    >
      Add money
    </ExternalLink>
  );

  useEffect(() => {
    let isMounted = true;
    let myMealPlans: any;
    getMealPlans()
      .then((res: IMealPlans[]) => {
        if (isMounted) {
          // check res to determine if account has a balance or not
          myMealPlans = res[0];
          if (myMealPlans.attributes.balance > 0) {
            setMealPlans(res);
            props.setFooterLink(MealPlanExternalLink());
          }
        }
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
        // If myMealPlans is not null OR the balance is 0 or less ...
        if (
          !myMealPlans ||
          (myMealPlans && myMealPlans.attributes && myMealPlans.attributes.balance <= 0)
        ) {
          /*
           Only going to run this function if it exists. The tests were getting angry because
           this function is undefined unless you can pass in the function from financial
          //  overview.  ;. 
           */
          if (typeof props.setHasMealPlan === 'function') {
            props.setHasMealPlan(false);
          }
        }
      });
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
          <HighlightEmphasis
            color={mealPlans[0].attributes.balance > 0 ? Color['pine-400'] : Color['lava-400']}
          >
            {formatDollars(mealPlans[0].attributes.balance)}
          </HighlightEmphasis>
          <HighlightTitle marginTop={0}>Meal Plan Balance</HighlightTitle>
          <HighlightDescription>
            The current balance for your UHDS or Orange Rewards meal plan.
          </HighlightDescription>
        </>
      ) : (
        !loading && <>No meal plans</>
      )}
    </Highlight>
  );
};

export default MealPlans;
