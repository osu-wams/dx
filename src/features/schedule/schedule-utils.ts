import { addDays, eachDayOfInterval } from 'date-fns';
import { isNullOrUndefined } from 'util';
import { ICourseSchedule, IMeetingTime } from '../../api/student/course-schedule';
import { format } from '../../util/helpers';

export interface ICoursesMap {
  courses: ICourseSchedule[];
  meetingTimes: IMeetingTime[];
  creditHours: number;
  subject: string;
  number: string;
  title: string;
}

export const startDate = () => {
  return new Date();
};

/**
 * Utility functions
 */
export const getNextFiveDays = (startDate: Date) => {
  const rangeStart = startDate;
  const rangeEnd = addDays(rangeStart, 4);
  const nextFiveDays = eachDayOfInterval({ start: rangeStart, end: rangeEnd });

  return nextFiveDays;
};

/**
 * Convert a Date to a short two letter code.
 * @param date the date to convert to short code
 */
export const getDayShortcode = (date: Date) => {
  let twoLetterShortcodes = ['Th', 'Sa', 'Su'];
  let shortcode = format(date, 'EEEE').substr(0, 2);
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
    c.attributes.meetingTimes.filter(
      // !TODO date to look into PST / UTC
      m => m.beginDate && Date.parse(m.beginDate.toString()) <= startDate().getTime()
    )
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
            if ((m.room && m.room === 'MID') || (m.scheduleType && m.scheduleType === 'MID')) {
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
 * Return a sorted Map of courses grouped by the subject and number (PSY400, PSY410, etc). The Map is sorted
 * in lexical fashion on the <subject><number>. The returned Map includes
 * calculated credit hours, a subject and number, and the complete array of matching courses.
 * @param courses an array of courses to be sorted
 * @returns Map<string, ICoursesMap> - a sorted Map with computed values and the courses array
 */
export const sortedGroupedByCourseName = (courses: ICourseSchedule[]): Map<string, ICoursesMap> => {
  // Reduce the courses list by accumulating an array of courses which have matching subject/number,
  // * example object returned might be { 'PSY400': [course,course,course], 'PSY410': [course] }
  const grouped: { [key: string]: ICourseSchedule[] } = courses.reduce((groups, course) => {
    const subjectNumber = `${course.attributes.courseSubject ?? ''}${course.attributes
      .courseNumber ?? ''}`;
    groups[subjectNumber] = groups[subjectNumber] || [];
    groups[subjectNumber].push(course);
    return groups;
  }, {});

  // Iterate the a sorted array of the keys in the grouped object and set the Map (it retains the sorted
  // order of the keys) with each of the computed values and the array of courses that were grouped
  const sorted: Map<string, ICoursesMap> = new Map();
  Object.keys(grouped)
    .sort()
    .forEach(key =>
      sorted.set(key, {
        subject: grouped[key][0].attributes?.courseSubject ?? '',
        number: grouped[key][0].attributes?.courseNumber ?? '',
        title: grouped[key][0].attributes?.courseTitle ?? '',
        courses: grouped[key],
        meetingTimes: grouped[key].reduce(
          (p, v) => p.concat(v.attributes.meetingTimes ?? ''),
          new Array<IMeetingTime>()
        ),
        creditHours: grouped[key].reduce((p, v) => (p += v.attributes.creditHours), 0)
      })
    );
  return sorted;
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
        return meetingTimeOnCorvallisCampus(m);
      })
  );
};

export const meetingTimeOnCorvallisCampus = (m: IMeetingTime): boolean => {
  return m.campus.toLowerCase().includes('corvallis');
};

/**
 * Filter out any meeting times that include one of the provided types, this is used to target and remove
 * final exam and midterm meetings.
 * @param meetings list of meetingTimes to filter
 * @param types scheduleType or meeting room to filter out
 */
export const exceptMeetingTypes = (meetings: IMeetingTime[], types: string[]): IMeetingTime[] => {
  return meetings.filter(meeting => {
    if (types.includes(meeting.scheduleType) || types.includes(meeting.room)) {
      return false;
    }
    return true;
  });
};

/**
 * Filter any meeting times that include one of the provided types, this is used to target and retain
 * final exam and midterm meetings.
 * @param meetings list of meetingTimes to filter
 * @param types scheduleType or meeting room to filter out
 */
export const onlyMeetingTypes = (meetings: IMeetingTime[], types: string[]): IMeetingTime[] => {
  return meetings.filter(meeting => {
    if (types.includes(meeting.scheduleType) || types.includes(meeting.room)) {
      return true;
    }
    return false;
  });
};

/**
 * Determine what type of exam label to display depending on the variety of data value options
 * being returned from the API.
 * @param meeting the meeting time to consider
 */
export const examName = (m: IMeetingTime) => {
  const roomTypes = [m.room?.toLowerCase(), m.scheduleType?.toLowerCase()];
  if (roomTypes.includes('fnl')) return 'Final Exam';
  if (roomTypes.includes('mid')) return 'Midterm';
};
