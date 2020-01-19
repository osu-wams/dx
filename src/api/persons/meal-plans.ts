import axios from 'axios';
import { useAPICall } from '@osu-wams/hooks';

interface MealPlansCallback {
  setFooterLink: Function;
  MealPlanExternalLink: Function;
  setHasMealPlan: Function;
}

const getMealPlans = (): Promise<IMealPlans[]> =>
  axios.get(`/api/persons/meal-plans`).then(res => res.data);

const useMealPlans = ({ callback = data => data } = {}) =>
  useAPICall<IMealPlans[]>({ api: getMealPlans, dataTransform: callback, initialState: [] });

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
