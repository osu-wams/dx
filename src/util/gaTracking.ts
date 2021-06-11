import ReactGA from 'react-ga';

// To make it easier to filter, our components will be the categories in Google Analytics
export type IComponents =
  | '404'
  | 'academic-calendar'
  | 'academic-overview'
  | 'account-balance'
  | 'admin'
  | 'anouncements'
  | 'application-search'
  | 'application-search-failed'
  | 'application-search-people'
  | 'application-search-person'
  | 'application-search-places'
  | 'application-search-place'
  | 'badge'
  | 'about'
  | 'about-info'
  | 'calendar-event'
  | 'canvas-auth'
  | 'course'
  | 'courses'
  | 'dx-event'
  | 'dynamic-card'
  | 'employee-navigation-main'
  | 'employee-tools'
  | 'events'
  | 'favorite-resource'
  | 'favorite-resources-card'
  | 'financial-transactions'
  | 'footer'
  | 'footer-menu-nav'
  | 'header'
  | 'info-button'
  | 'it-system-status'
  | 'it-system-status-sticky'
  | 'meal-plans'
  | 'notifications'
  | 'notifications-menu'
  | 'past-courses-search'
  | 'past-courses-search-failed'
  | 'planner-items'
  | 'profile'
  | 'program-of-study'
  | 'resource'
  | 'resource-search'
  | 'resource-search-failed'
  | 'resource-category'
  | 'resources-card'
  | 'resource-warning'
  | 'schedule-card'
  | 'student-navigation-main'
  | 'student-mobile-nav'
  | 'training'
  | 'training-featured'
  | 'training-tags'
  | 'training-audiences'
  | 'training-search'
  | 'training-search-failed'
  | 'trending-resource'
  | 'trending-resources-card';

/**
 * Event - Add custom tracking event.
 * @param {enum} category
 * @param {string} action
 * @param {string} label
 */
export const Event = (category: IComponents, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const EventAction = {
  resourceWarning: {
    modalOpened: 'modal opened',
    modalClosed: 'modal closed',
    resourceAccessed: 'continued to resource',
  },
};
