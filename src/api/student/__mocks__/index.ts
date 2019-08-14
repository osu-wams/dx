import courses from './courses.data';
import grades from './grades.data';
import holds from './holds.data';
import accountBalance from './accountBalance.data';
import accountTransactions from './accountTransactions.data';
import academicStatus from './academicStatus.data';
import assignments from './assignments.data';
import plannerItemsData from './plannerItems.data';

export const getAccountTransactions = () => Promise.resolve(accountTransactions);

export const getAccountBalance = () => Promise.resolve(accountBalance);

export const getAcademicStatus = () => Promise.resolve(academicStatus);

export const getGrades = () => Promise.resolve(grades);

export const getAccountHolds = () => Promise.resolve(holds);

export const getUpcomingAssignments = () => Promise.resolve(assignments);

export const getCourseSchedule = () => Promise.resolve(courses);

export const getPlannerItems = () => Promise.resolve(plannerItemsData);
