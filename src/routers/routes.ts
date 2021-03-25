import { User } from '@osu-wams/lib';
/**
 * Application routes
 * Additionally these routes are used by state/search for our recoil search index
 * The pageName match the names coming from Drupal
 */
const STU = User.AFFILIATIONS.student;
const EMP = User.AFFILIATIONS.employee;
const ACA = 'academics';
const PAST = 'past-courses';

const makePath = (path: string, dashboard?: string) => {
  const url = '/' + path;
  if (dashboard) {
    return '/' + dashboard + url;
  }
  return url;
};

const Dashboards = {
  employee: EMP,
  student: STU,
};

const Routes = (dashboard?: string) => ({
  profile: {
    pageName: 'Profile',
    path: 'profile', // no prefix
    fullPath: makePath('profile'),
  },
  about: {
    pageName: 'About',
    path: 'about', // no prefix
    fullPath: makePath('about'),
  },
  search: {
    pageName: 'Search',
    path: 'search', // no prefix
    fullPath: makePath('search'),
  },
  notifications: {
    pageName: 'Notifications',
    path: 'notifications', // no prefix
    fullPath: makePath('notifications'),
  },
  resources: {
    pageName: 'Resources',
    path: 'resources', // either student/ or /employee
    fullPath: makePath('resources', dashboard),
  },
  academics: {
    pageName: 'Academics',
    path: ACA, // student
    fullPath: makePath(ACA, STU),
  },
  pastcourses: {
    pageName: 'PastCourses',
    path: PAST, // student
    fullPath: makePath(`${ACA}/${PAST}`, STU),
  },
  finances: {
    pageName: 'Finances', // student
    path: 'finances',
    fullPath: makePath('finances', STU),
  },
  trainings: {
    pageName: 'Trainings', // employee
    path: 'training',
    fullPath: makePath('training', EMP),
  },
  student: {
    pageName: STU,
    path: STU,
    fullPath: makePath(STU),
  },
  employee: {
    pageName: EMP,
    path: EMP,
    fullPath: makePath(EMP),
  },
});

export { Routes, Dashboards };
