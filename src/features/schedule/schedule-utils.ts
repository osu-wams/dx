import { addDays, eachDay, format } from 'date-fns';
import { ICourseSchedule, IMeetingTime } from '../../api/student/course-schedule';
import { isNullOrUndefined } from 'util';

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
 *  Return an array of currently running courses that have a meeting time that includes the provided day short code, sorting
 * the resulting array based on the courses begin times.
 * @param courses an array of courses to be filtered
 * @param dayShortCode a day short code (M, T, W, Th, F)
 * @returns ICourseSchedule[] - an array of filtered and sorted courses
 */
export const coursesOnDay = (
  courses: ICourseSchedule[],
  dayShortCode: string
): ICourseSchedule[] => {
  const dayCourses = currentCourses(
    sortedByBeginTime(
      courses.filter(
        c =>
          c.attributes.meetingTimes.length > 0 &&
          c.attributes.meetingTimes.find(m => {
            if (m.room === 'MID' || m.scheduleType === 'MID') {
              // exclude midterms
              return false;
            } else {
              return m.weeklySchedule.includes(dayShortCode);
            }
          })
      )
    )
  );
  return dayCourses;
};

/**
 *  Return an array of courses that have been lexically sorted on the concatenated meeting beginTimes. Typically
 * the class has one meeting time.
 * * In the case where there are multiples, the value used to sort might look
 * * like '08:0014:00' when the class meets at both 8am and 2pm, this would naturally sort after a class that has
 * * a meeting time at 8am and 1pm ('08:0013:00').
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
 * * An example might look like 'PSY400' sorting after 'HST220'.
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

/**
 * Inspect the course to see if it has a meeting time that is associated to the course
 * campus that include the word 'corvallis'.
 * * An example of the provided data would be 'Oregon State - Corvallis'
 * @param course the course to be evaluated for campus location
 * @returns boolean - true if a course meeting time has a campus detail of Corvallis
 */
export const courseOnCorvallisCampus = (o: ICourseSchedule | IMeetingTime[]): boolean => {
  let meetingTimes: IMeetingTime[];
  if (o instanceof Array) {
    meetingTimes = o;
  } else {
    meetingTimes = o.attributes.meetingTimes;
  }
  return !isNullOrUndefined(
    meetingTimes
      .filter(m => !isNullOrUndefined(m))
      .find((m: IMeetingTime) => {
        return m.campus.toLowerCase().includes('corvallis');
      })
  );
};
