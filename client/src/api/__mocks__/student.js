import courses from './courses.data';

// export const getAcademicStatus = () =>
//   axios.get(`/api/student/academic-status`).then(res => res.data);

// export const getAccountBalance = () =>
//   axios.get('/api/student/account-balance').then(res => res.data);

// export const getAccountTransactions = () =>
//   axios.get('/api/student/account-transactions').then(res => res.data);

// export const getCourseSchedule = (term = 'current') =>
//   axios.get(`/api/student/class-schedule?term=${term}`).then(res => res.data);

export const getCourseSchedule = () => Promise.resolve(courses);

// export const getGrades = (term = 'current') =>
//   axios.get(`/api/student/grades?term=${term}`).then(res => res.data);

// export const getAccountHolds = () => axios.get('/api/student/holds').then(res => res.data);
