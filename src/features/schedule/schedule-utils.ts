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

/**
 * Convert a Date to a short two letter code.
 * @param date the date to convert to short code
 */
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
  return sortedByBeginTime(
    courses.filter(
      c => c.attributes.meetingTimes.findIndex(m => m.weeklySchedule.includes(dayShortCode)) > -1
    )
  );
};

/**
 *  Return an array of courses that have been lexically sorted on the concatenated meeting beginTimes. Typically
 * the class has one meeting time. In the case where there are multiples, the value used to sort might look
 * like '08:0014:00' when the class meets at both 8am and 2pm, this would naturally sort after a class that has
 * a meeting time at 8am and 1pm ('08:0013:00').
 * @param courses an array of courses to be sorted
 * @returns ICourseSchedule[] - an array of courses
 */
const sortedByBeginTime = (courses: ICourseSchedule[]): ICourseSchedule[] => {
  return courses.sort((a, b) => {
    const aTimes = a.attributes.meetingTimes.map(m => m.beginTime).reduce((p, c) => p + c);
    const bTimes = b.attributes.meetingTimes.map(m => m.beginTime).reduce((p, c) => p + c);
    return aTimes > bTimes ? 1 : aTimes < bTimes ? -1 : 0;
  });
};

/**
 *  Return an array of courses that have been lexically sorted on the concatenated course subject and number.
 * An example might look like 'PSY400' sorting after 'HST220'.
 * @param courses an array of courses to be sorted
 * @returns ICourseSchedule[] - an array of courses
 */
export const sortedByCourseName = (courses: ICourseSchedule[]): ICourseSchedule[] => {
  return courses.sort((a, b) => {
    const aSubject = `${a.attributes.courseSubject}${a.attributes.courseNumber}`;
    const bSubject = `${b.attributes.courseSubject}${b.attributes.courseNumber}`;
    return aSubject > bSubject ? 1 : aSubject < bSubject ? -1 : 0;
  });
};
