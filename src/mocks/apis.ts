/**
 * API Endpoints
 */

const stu = '*/api/student/';
const events = '*/api/events';
const an = '*/api/announcements/';
const res = '*/api/resources/';
const alerts = '*/api/alerts';
const persons = '*/api/persons';
const user = '*/api/user';
const info = '*/api/info-buttons';
const train = '*/api/trainings/';
/**
 * Student API paths
 */
export const PLANNER_ITEMS_API = stu + 'planner-items';

export const HOLDS_API = stu + 'holds';

export const GPA_API = stu + 'gpa';

export const GRADES_API = stu + 'grades';

export const ACADEMIC_STATUS_API = stu + 'academic-status';

// class-schedule?term=current
export const CLASS_SCHEDULE_API = stu + 'class-schedule*';

// degrees?term=
export const DEGREES_API = stu + 'degrees*';

export const ACCOUNT_BALANCE_API = stu + 'account-balance';

export const ACCOUNT_TRANSACTION_API = stu + 'account-transactions';

/**
 * Events API
 */
export const ACADEMIC_CALENDAR_API = events + '/academic-calendar';

export const STUDENT_EVENTS_API = events;

export const EMPLOYEE_EVENTS_API = events + '/employee';

export const CAMPUS_EVENTS_API = events + '/campus/*';

/**
 * Anouncements
 */
export const ANNOUNCEMENTS_API = an + '*';

/**
 * Resources
 */

export const RESOURCES_API = res;
export const RESOURCES_BY_QUEUE_API = res + 'category/*';
export const CATEGORIES_API = res + 'categories/';
export const TRENDING_RESOURCES_API = res + 'trending/*';
export const FAVORITE_RESOURCES_API = res + 'favorites/';

/**
 * Alerts
 */
export const RAVE_ALERTS_API = alerts;

export const DX_ALERTS_API = alerts + '/dx';

/**
 * Trainings
 */
export const TRAININGS_API = train;

export const TRAININGS_TAGS_API = train + 'tags';

export const TRAININGS_AUDIENCES_API = train + 'audiences';

/**
 * Person
 */
export const PERSONS_API = persons;

export const PERSONS_EMAIL_API = persons + '/emails';

export const PERSONS_PHONE_API = persons + '/phones';

export const PERSONS_MEALPLAN_API = persons + '/meal-plans';

export const PERSONS_ADDRESSES_API = persons + '/addresses';

/**
 * User
 */
export const USER_API = user;
export const USER_MESSAGES_API = user + '/messages';

/**
 * Info-Buttons
 */

export const INFO_BUTTON_API = info;

/**
 * Status
 */
export const IT_STATUS_API = '*/api/status';

/**
 * Cards (Dynamic Cards)
 */
export const CARDS_API = '*/api/cards';

/**
 * Page Content (about page and such from Drupal)
 */
export const PAGE_CONTENT_API = '*/api/page-content';

/**
 * Release Notes
 */
export const RELEASE_NOTES_API = '*/api/release-notes';

/**
 * Healthcheck
 */
export const HEALTH_CHECK_API = '*/healthcheck';

/**
 * App Version API
 */
export const APP_VERSION_API = '*/app_version';

/**
 * People Search
 */
export const PEOPLE_API = '*/api/people/*';

/**
 * Locations Search
 */
export const LOCATIONS_API = '*/api/locations/*';
