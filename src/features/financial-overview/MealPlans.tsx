import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useMealPlans } from '../../api/persons/meal-plans';
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

export const MealPlans = props => {
  const { setFooterLink, setHasMealPlan } = props;

  const mealPlans = useMealPlans({
    callback: data => {
      if (data.length) {
        if (data[0].attributes.balance > 0) {
          setFooterLink(MealPlanExternalLink());
        }
        setHasMealPlan(data[0].attributes.balance > 0);
      } else {
        setHasMealPlan(false);
      }
      return data;
    }
  });

  return (
    <Highlight textAlignLeft>
      {mealPlans.loading && (
        <HighlightTitle>
          <Skeleton count={4} />
        </HighlightTitle>
      )}
      {mealPlans && mealPlans.data && mealPlans.data.length ? (
        <>
          <HighlightEmphasis
            color={mealPlans.data[0].attributes.balance > 0 ? Color['pine-400'] : Color['lava-400']}
          >
            {formatDollars(mealPlans.data[0].attributes.balance)}
          </HighlightEmphasis>
          <HighlightTitle marginTop={0}>Meal Plan Balance</HighlightTitle>
          <HighlightDescription>
            The current balance for your UHDS or Orange Rewards meal plan.
          </HighlightDescription>
        </>
      ) : (
        !mealPlans.loading && <>No meal plans</>
      )}
    </Highlight>
  );
};

export default MealPlans;
