import axios from 'axios';
import useAPICall from '../useAPICall';

const getPlannerItems = (): Promise<any> =>
  axios.get('/api/student/planner-items').then(res => res.data);

const usePlannerItems = () => useAPICall<any[]>(getPlannerItems, undefined, data => data, []);

export { getPlannerItems, usePlannerItems };
