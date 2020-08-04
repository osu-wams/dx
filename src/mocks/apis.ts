/**
 * API Endpoints
 */

const stu = '/api/student/';
const events = '/api/events/';
const an = '/api/announcements/';
/**
 * Student API paths
 */
export const HOLDS_API = stu + 'holds';

export const GPA_API = stu + 'gpa';

export const ACADEMIC_STATUS_API = stu + 'academic-status';

export const CLASS_SCHEDULE_API = stu + 'class-schedule?term=current';

/**
 * Events API
 */
export const ACADEMIC_CALENDAR_API = events + 'academic-calendar';

/**
 * Anouncements
 */
export const ACADEMIC_ANNOUNCEMENTS_API = an + '*';
