/**
 * Application routes
 * Additionally these routes are used by state/search for our recoil search index
 * The pageName match the names coming from Drupal
 */
const Routes = {
  profile: {
    pageName: 'Profile',
    path: 'profile', // no prefix
  },
  about: {
    pageName: 'About',
    path: 'about', // no prefix
  },
  search: {
    pageName: 'Search',
    path: 'search', // no prefix
  },
  notifications: {
    pageName: 'Notifications',
    path: 'notifications', // no prefix
  },
  resources: {
    pageName: 'Resources',
    path: 'resources', // either student/ or /employee
  },
  academics: {
    pageName: 'Academics',
    path: 'academics', // student
  },
  pastcourses: {
    pageName: 'PastCourses',
    path: 'past-courses', // student
  },
  finances: {
    pageName: 'Finances', // student
    path: 'finances',
  },
  trainings: {
    pageName: 'Trainings', // employee
    path: 'training',
  },
};

export { Routes };
