import axios from 'axios';

const getMealPlans = (): Promise<IMealPlans[]> =>
  axios.get(`/api/persons/meal-plans`).then(res => res.data);

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

export { getMealPlans };
