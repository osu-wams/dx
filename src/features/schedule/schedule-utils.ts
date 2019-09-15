import { addDays, eachDay, format } from 'date-fns';
import { ICourseSchedule } from '../../api/student/course-schedule';

/**
 * Utility functions
 */
export const getNextFiveDays = () => {
  let rangeStart = new Date();
  let rangeEnd = addDays(rangeStart, 4);
  let nextFiveDays = eachDay(rangeStart, rangeEnd);

  return nextFiveDays;
};

export const getDayShortcode = (date: Date) => {
  let twoLetterShortcodes = ['Th', 'Sa', 'Su'];

  let shortcode = format(date, 'dddd').substr(0, 2);
  shortcode = twoLetterShortcodes.includes(shortcode) ? shortcode : shortcode.substr(0, 1);
  return shortcode;
};

/**
 * Return an array of courses that have a meeting time that has a beginDate before right now.
 * @param courses the full list of courses returned from API
 * @returns ICourseSchedule[] - an array of courses
 */
export const currentCourses = (courses: ICourseSchedule[]): ICourseSchedule[] => {
  return courses.filter(c =>
    c.attributes.meetingTimes.filter(m => m.beginDate && Date.parse(m.beginDate) <= Date.now())
  );
};

/**
 *  Return an array of courses that have a meeting time that includes the provided day short code
 * @param courses an array of courses to be filtered
 * @param dayShortCode a day short code (M, T, W, Th, F)
 * @returns ICourseSchedule[] - an array of courses
 */
export const coursesOnDay = (
  courses: ICourseSchedule[],
  dayShortCode: string
): ICourseSchedule[] => {
  return courses.filter(
    c => c.attributes.meetingTimes.findIndex(m => m.weeklySchedule.includes(dayShortCode)) > -1
  );
};
