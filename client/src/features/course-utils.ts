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

// You can get the icon for a course type (Lecture, Lab, Final exam, etc.)
// You need the scheduleType value from the API.
// Example usage: <Icon icon={CourseIcons[scheduleType]} />
// TODO: maybe make this a funciton that returns data. Basically we default icon if we can't match letter
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
