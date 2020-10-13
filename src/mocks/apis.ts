/**
 * API Endpoints
 */

const stu = '/api/student/';
const events = '/api/events/';
const an = '/api/announcements/';
const res = '/api/resources/';
const alerts = '/api/alerts';
const persons = '/api/persons';
const user = '/api/user';
/**
 * Student API paths
 */
export const HOLDS_API = stu + 'holds';

export const GPA_API = stu + 'gpa';

export const ACADEMIC_STATUS_API = stu + 'academic-status';

export const CLASS_SCHEDULE_API = stu + 'class-schedule?term=current';

export const DEGREES_API = stu + 'degrees?term=';

export const ACCOUNT_BALANCE_API = stu + 'account-balance';

/**
 * Events API
 */
export const ACADEMIC_CALENDAR_API = events + 'academic-calendar';

/**
 * Anouncements
 */
export const ACADEMIC_ANNOUNCEMENTS_API = an + '*';

/**
 * Resources
 */
export const RESOURCES_BY_QUEUE_API = res + 'category/*';

/**
 * Alerts
 */
export const RAVE_ALERTS_API = alerts;

export const DX_ALERTS_API = alerts + '/dx';

/**
 * Trainings
 */
export const TRAININGS_API = '/api/trainings';

export const TRAININGS_TAGS_API = '/api/trainings/tags';

/**
 * Person
 */
export const PERSONS_API = persons;

export const PERSONS_ADDRESSES_API = persons + '/addresses';

/**
 * User
 */
export const USER_MESSAGES_API = user + '/messages';
