import ReactGA from 'react-ga';

/**
 * Event - Add custom tracking event.
 * @param {enum} category
 * @param {string} action
 * @param {string} label
 */
export const Event = (category: Components, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label
  });
};

// To make it easier to filter, our components will be the categories in Google Analytics
type Components =
  | 'footer'
  | 'header'
  | 'navigation-main'
  | 'schedule-card'
  | 'featured-resources'
  | 'anouncements'
  | 'events'
  | 'courses'
  | 'course'
  | 'planner-items'
  | 'academic-calendar'
  | 'academic-resourses'
  | 'academic-overview';
