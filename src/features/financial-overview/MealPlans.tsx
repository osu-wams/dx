import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useMealPlans } from '@osu-wams/hooks';
import { formatDollars } from 'src/util/helpers';
import {
  Highlight,
  HighlightTitle,
  HighlightEmphasis,
  HighlightDescription,
} from 'src/ui/Highlights';
import { ExternalLink } from 'src/ui/Link';
import { Event } from 'src/util/gaTracking';
import { ThemeContext } from 'src/theme';
import mealPlan from '../../assets/meal-plan.svg';
import { EmptyState, EmptyStateImage, EmptyStateText } from 'src/ui/EmptyStates';

const NoMealPlans = () => (
  <EmptyState>
    <EmptyStateImage src={mealPlan} alt="" />
    <EmptyStateText>You do not have a meal plan.</EmptyStateText>
  </EmptyState>
);

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
        !mealPlans.loading && <NoMealPlans />
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
