import {
  faComments,
  faFlask,
  faUser,
  faBooks,
  faSnowboarding,
  faVial,
  faBriefcase,
  faVideo,
  faBookSpells,
  faUserTie,
  faChalkboardTeacher,
  faUsersClass,
  faBookReader,
  faPenNib,
  faPencilPaintbrush,
  faTasks,
  faUserHeadset,
  faUserMd,
  faTools,
  faGlobe,
  faTh,
  faCalendarDay,
  faFileInvoice,
  faLaptop
} from '@fortawesome/pro-light-svg-icons';
import { ICourseSchedule } from '../api/student/course-schedule';

// You can get the icon for a course type (Lecture, Lab, Final exam, etc.)
// You need the scheduleType value from the API.
// Example usage: <Icon icon={CourseIcons[scheduleType]} />
export const CourseIcons = {
  A: faUsersClass,
  B: faComments,
  C: faChalkboardTeacher,
  D: faFlask,
  E: faUser,
  F: faBooks,
  G: faSnowboarding,
  H: faVial,
  I: faBriefcase,
  J: faVideo,
  K: faUsersClass,
  L: faBookSpells,
  M: faUserTie,
  N: faBookReader,
  O: faUserTie,
  P: faBookReader,
  Q: faPenNib,
  R: faPencilPaintbrush,
  S: faTasks,
  T: faUserHeadset,
  U: faUserMd,
  W: faTools,
  Y: faGlobe,
  Z: faTh,
  V: faFileInvoice,
  X: faCalendarDay,
  MID: faFileInvoice,
  FNL: faFileInvoice,
  HYB: faLaptop
};

export const getIconByScheduleType = (scheduleType: string) => {
  return CourseIcons[scheduleType] ? CourseIcons[scheduleType] : CourseIcons.A;
};

/**
 * Hacky method (that's being kind) which tries to find a course that the student is
 * currently enrolled in that matches the course context name for an assignment being
 * rendered. This method *depends* on the fact that courses are defined a certain way
 * in Canvas. *see the example contextName*
 *
 * If there are no matches found for any reason (the format of the contextName changes, there are
 * no courses returned from the API, etc) then return undefined.
 * * example contextName = "INTRO NATIVE AMERICAN STUDIES (ES_241_400_F2019)"
 * @param contextName the course context name from Canvas
 * @param courseList the array of courses for the student
 */
export const matchedCourseContext = (
  contextName: string,
  courses: ICourseSchedule[]
): { courseSubject: string; courseNumber: string } | undefined => {
  // Expecting the context name to include something like "(PSY_240_400_F2019)"
  // and matching groups as subject "PSY" and number "240"
  const matches = contextName.match(/\((?<courseSubject>\w+)_(?<courseNumber>\w+)_\w+_\w+\)/);
  if (matches && matches.groups) {
    const { courseSubject, courseNumber } = matches.groups;
    const course = courses.find(
      c =>
        c.attributes.courseSubject.toLowerCase() === courseSubject.toLowerCase() &&
        c.attributes.courseNumber.toLowerCase() === courseNumber.toLowerCase()
    );
    if (course) {
      return { courseSubject, courseNumber };
    }
  }
  return undefined;
};
