import { atom, selector, selectorFamily } from 'recoil';
import Fuse from 'fuse.js';
import { Types, User } from '@osu-wams/lib';
import { announcementState, ANNOUNCEMENT_PAGES } from './announcements';
import { resourceState } from './resources';
import { trainingState } from './trainings';
import { localistEventsState } from './events';
import { gradesState } from './grades';
import { courseState } from './courses';
import { plannerItemState } from './plannerItems';
import { canvasUrl } from 'src/features/canvas/CanvasPlannerItems';

export interface SearchItem {
  type: string;
  id: string;
  title: string;
  to?: string;
  href?: string;
  attr: {
    announcement?: Types.Announcement;
    courses?: Types.CourseScheduleAttributes;
    event?: Types.LocalistEvent;
    grades?: Types.GradesAttributes;
    training?: Types.Training;
    plannerItem?: Types.PlannerItem;
    resource?: Types.Resource;
  };
}

const eventSearchItems = selector<SearchItem[]>({
  key: 'eventSearchItems',
  get: ({ get }) => {
    const events = [
      get(localistEventsState({ campus: 'bend' })),
      get(localistEventsState({ affiliation: User.AFFILIATIONS.employee })),
      get(localistEventsState({ affiliation: User.AFFILIATIONS.student })),
    ];
    const all = events
      .map((a) =>
        a.data.map((event) => ({
          type: 'Event',
          id: event.id.toString(),
          title: event.title,
          href: event.action.link,
          attr: {
            event,
          },
        }))
      )
      .reduce((p, v) => p.concat(v), []);
    // unique array of items based on thier item.id
    return Array.from(new Map(all.map((item) => [item.id, item])).values());
  },
});

const announcementSearchItems = selector<SearchItem[]>({
  key: 'announcementSearchItems',
  get: ({ get }) => {
    const announcements = [
      get(announcementState(ANNOUNCEMENT_PAGES.academics)),
      get(announcementState(ANNOUNCEMENT_PAGES.dashboard)),
      get(announcementState(ANNOUNCEMENT_PAGES.finances)),
    ];
    const all = announcements
      .map((a) =>
        a.data.map((announcement) => ({
          type: 'Announcement',
          id: announcement.id,
          title: announcement.title,
          href: announcement.action?.link,
          attr: {
            announcement,
          },
        }))
      )
      .reduce((p, v) => p.concat(v), []);
    // unique array of items based on thier item.id
    return Array.from(new Map(all.map((item) => [item.id, item])).values());
  },
});

const gradesSearchItems = selector<SearchItem[]>({
  key: 'gradesSearchItems',
  get: ({ get }) => {
    const grades = get(gradesState);
    return grades.data.map((grade) => ({
      type: 'Past Course',
      id: grade.id,
      title: grade.attributes.courseTitle,
      to: '/student/academics/past-courses',
      attr: {
        grades: { ...grade.attributes },
      },
    }));
  },
});

const coursesSearchItems = selector<SearchItem[]>({
  key: 'coursesSearchItems',
  get: ({ get }) => {
    const courses = get(courseState);
    return courses.data.map((course) => ({
      type: 'Current Course',
      id: course.id,
      title: course.attributes.courseTitle,
      to: '/student/academics',
      attr: {
        courses: { ...course.attributes },
      },
    }));
  },
});

const trainingSearchItems = selector<SearchItem[]>({
  key: 'trainingSearchItems',
  get: ({ get }) => {
    const trainings = get(trainingState);
    return trainings.data.map((training) => ({
      type: 'Training',
      id: training.id,
      title: training.title,
      to: '/employee/training',
      attr: {
        training,
      },
    }));
  },
});

const resourceSearchItems = selector<SearchItem[]>({
  key: 'resourceSearchItems',
  get: ({ get }) => {
    const resources = get(resourceState);
    return resources.data.map((resource) => ({
      type: 'Resource',
      id: resource.id,
      title: resource.title,
      href: resource.link,
      attr: {
        resource,
      },
    }));
  },
});

const plannerItemSearchItems = selector<SearchItem[]>({
  key: 'plannerItemSearchItems',
  get: ({ get }) => {
    const plannerItems = get(plannerItemState);
    return plannerItems.data.map((plannerItem) => ({
      type: 'Canvas',
      id: `${plannerItem.course_id}-${plannerItem.plannable_id}`,
      title: plannerItem.plannable.title,
      href: canvasUrl(plannerItem.html_url),
      attr: {
        plannerItem,
      },
    }));
  },
});

const fuseOptions: Fuse.IFuseOptions<SearchItem> = {
  includeScore: true,
  minMatchCharLength: 2,
  threshold: 0.1, // the lower the number, the more exact the match, 0.2 seems too broad
  ignoreLocation: true,
  keys: [
    'title',
    'attr.announcement.action.title',
    'attr.announcement.body',
    'attr.courses.courseNumber',
    'attr.courses.courseReferenceNumber',
    'attr.courses.courseSubject',
    'attr.courses.courseSubjectDescription',
    'attr.courses.courseSubjectNumber',
    'attr.courses.faculty.email',
    'attr.courses.faculty.name',
    'attr.courses.meetingTimes.building',
    'attr.courses.meetingTimes.buildingDescription',
    'attr.courses.meetingTimes.campus',
    'attr.courses.termDescription',
    'attr.event.action.title',
    'attr.event.body',
    'attr.event.city',
    'attr.grades.courseNumber',
    'attr.grades.courseReferenceNumber',
    'attr.grades.courseSubject',
    'attr.grades.courseSubjectDescription',
    'attr.grades.courseSubjectNumber',
    'attr.grades.gradeFinal',
    'attr.plannerItem.context_name',
    'attr.plannerItem.context_type',
    'attr.plannerItem.plannable.title',
    'attr.plannerItem.plannable_type',
    'attr.resource.synonyms',
    'attr.training.audiences',
    'attr.training.body',
    'attr.training.contact',
    'attr.training.cost',
    'attr.training.courseDesign',
    'attr.training.department',
    'attr.training.duration',
    'attr.training.frequency',
    'attr.training.prerequisites',
    'attr.training.tags',
    'attr.training.type',
    'attr.training.websiteTitle',
    'attr.training.websiteUri',
  ],
};

export const fuseIndex = selector<Fuse<SearchItem>>({
  key: 'fuseIndex',
  get: ({ get }) => {
    const announcements = get(announcementSearchItems);
    const trainings = get(trainingSearchItems);
    const resources = get(resourceSearchItems);
    const events = get(eventSearchItems);
    const grades = get(gradesSearchItems);
    const courses = get(coursesSearchItems);
    const plannerItems = get(plannerItemSearchItems);
    const items: SearchItem[] = [
      ...announcements,
      ...trainings,
      ...resources,
      ...events,
      ...grades,
      ...courses,
      ...plannerItems,
    ];
    return new Fuse(items, fuseOptions);
  },
});

export const searchIndex = selectorFamily<Fuse.FuseResult<SearchItem>[], string>({
  key: 'searchIndex',
  get: (query) => ({ get }) => {
    const index = get(fuseIndex);
    const results = index.search(query);
    return results;
  },
});

/**
 * The state of the application wide search bar value, this can change rapidly and
 * is reflected by the value entered in the input field in the UI. This value
 * is intended to be consumed by a useDebounce hook and useEffect to eventually set the value
 * of debouncedApplicationSearchState with.
 */
export const applicationSearchState = atom<string>({
  key: 'applicationSearchState',
  default: '',
});

/**
 * After an elapsed period of time specified in a useDebounce hook, a related
 * useEffect would set the value of this state which is used by other selectors or hooks.
 * This value is a search term after the user has stopped typing for a period of time, and it will
 * initiate searching and filtering the application wide search items.
 */
export const debouncedApplicationSearchState = atom<string | undefined>({
  key: 'debouncedApplicationSearchState',
  default: undefined,
});

/**
 * If debouncedQuery is reset to its default (undefined), then return
 * nothing, otherwise return the items filtered by the search term entered.
 */
export const filteredApplicationSearchState = selector<Fuse.FuseResult<SearchItem>[]>({
  key: 'filteredApplicationSearchState',
  get: ({ get }) => {
    const debouncedQuery = get(debouncedApplicationSearchState);
    if (!debouncedQuery) {
      return [];
    } else {
      return get(searchIndex(debouncedQuery));
    }
  },
});
