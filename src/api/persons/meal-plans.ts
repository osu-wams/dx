import axios from 'axios';
import useAPICall from '../useAPICall';

interface MealPlansCallback {
  setFooterLink: Function;
  MealPlanExternalLink: Function;
  setHasMealPlan: Function;
}

const getMealPlans = (): Promise<IMealPlans[]> =>
  axios.get(`/api/persons/meal-plans`).then(res => res.data);

const useMealPlans = (callbacks: MealPlansCallback) =>
  useAPICall<IMealPlans[]>(
    getMealPlans,
    undefined,
    (data: IMealPlans[]) => {
      if (data.length) {
        if (data[0].attributes.balance > 0) {
          callbacks.setFooterLink(callbacks.MealPlanExternalLink());
        }
        callbacks.setHasMealPlan(data[0].attributes.balance > 0);
      } else {
        callbacks.setHasMealPlan(false);
      }
      return data;
    },
    []
  );

export interface IMealPlans {
  attributes: IMealPlansAttributes;
  id: string;
  links: { self: string };
  type: string;
}

export interface IMealPlansAttributes {
  mealPlan: string;
  balance: number;
  lastUsedDate: string;
  lastUsedPlace: string | null;
}

export { useMealPlans };
