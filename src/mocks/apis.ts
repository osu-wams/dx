/**
 * API Endpoints
 */

const stu = '/api/student/';
const events = '/api/events/';
const an = '/api/announcements/';
const res = '/api/resources/';
/**
 * Student API paths
 */
export const HOLDS_API = stu + 'holds';

export const GPA_API = stu + 'gpa';

export const ACADEMIC_STATUS_API = stu + 'academic-status';

export const CLASS_SCHEDULE_API = stu + 'class-schedule?term=current';

export const DEGREES_API = stu + 'degrees?term=';

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
