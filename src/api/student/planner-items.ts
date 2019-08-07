import axios from 'axios';

const getPlannerItems = (): Promise<any> =>
  axios.get('/api/student/planner-items').then(res => res.data);

export { getPlannerItems };
