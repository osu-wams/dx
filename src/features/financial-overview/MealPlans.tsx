import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useMealPlans } from '../../api/persons/meal-plans';
import { formatDollars } from '../../util/helpers';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription
} from '../../ui/Highlights';
import { ExternalLink } from '../../ui/Link';
import { Event } from '../../util/gaTracking';
import { ThemeContext } from '../../theme';

export const MealPlans = () => {
  const themeContext = useContext(ThemeContext);
  const mealPlans = useMealPlans();

  return (
    <Highlight textAlignLeft>
      {mealPlans.loading && (
        <HighlightTitle>
          <Skeleton count={4} />
        </HighlightTitle>
      )}
      {mealPlans?.data?.length ? (
        <>
          <HighlightEmphasis
            color={
              mealPlans.data[0].attributes?.balance && mealPlans.data[0].attributes?.balance > 0
                ? themeContext.features.finances.mealPlans.emphasisBalance.color
                : themeContext.features.finances.mealPlans.emphasisNoBalance.color
            }
          >
            {formatDollars(mealPlans.data[0].attributes?.balance)}
          </HighlightEmphasis>
          <HighlightTitle marginTop={0}>Meal Plan Balance</HighlightTitle>
          <HighlightDescription>
            The current balance for your UHDS or Orange Rewards meal plan.
          </HighlightDescription>
        </>
      ) : (
        !mealPlans.loading && <>No meal plans</>
      )}
      <ExternalLink
        style={{ float: 'right', paddingTop: '16px' }}
        href="http://mycard.oregonstate.edu/"
        onClick={() => Event('meal-plans', 'Add money to card - mycard link')}
      >
        Add money
      </ExternalLink>
    </Highlight>
  );
};

export default MealPlans;
