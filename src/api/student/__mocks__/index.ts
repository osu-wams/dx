import holds from './holds.data';
import assignments from './assignments.data';
import plannerItemsData from './plannerItems.data';

export const getAccountHolds = () => Promise.resolve(holds);

export const getUpcomingAssignments = () => Promise.resolve(assignments);

export const getPlannerItems = () => Promise.resolve(plannerItemsData);
