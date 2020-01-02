import ReactGA from 'react-ga';

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
    label
  });
};

// To make it easier to filter, our components will be the categories in Google Analytics
export type IComponents =
  | 'footer'
  | 'beta'
  | 'beta-info'
  | 'header'
  | 'student-navigation-main'
  | 'employee-navigation-main'
  | 'employee-tools'
  | 'schedule-card'
  | 'resources-card'
  | 'anouncements'
  | 'events'
  | 'courses'
  | 'course'
  | 'planner-items'
  | 'meal-plans'
  | 'dx-event'
  | 'calendar-event'
  | 'academic-calendar'
  | 'financial-transactions'
  | 'academic-overview'
  | 'account-balance'
  | 'resource'
  | '404'
  | 'resource-search'
  | 'resource-category'
  | 'past-courses-search'
  | 'info-button'
  | 'canvas-auth'
  | 'badge'
  | 'it-system-status'
  | 'it-system-status-sticky';
