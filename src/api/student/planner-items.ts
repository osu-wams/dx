import axios from 'axios';
import useAPICall from '../useAPICall';

// TODO : If the result of this call errors, should the user session be refreshed so that we can understand
// if the users opt-in had changed by virtue of them opting-out on Canvas side?
const getPlannerItems = (): Promise<any> =>
  axios.get('/api/student/planner-items').then(res => res.data);

const usePlannerItems = (errorCallback: Function) =>
  useAPICall<any[]>(getPlannerItems, undefined, data => data, [], true, errorCallback);

export { getPlannerItems, usePlannerItems };
