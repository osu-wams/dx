import { atom, selector, selectorFamily } from 'recoil';
import Fuse from 'fuse.js';
import { Types, User } from '@osu-wams/lib';
import { announcementState, ANNOUNCEMENT_PAGES } from './announcements';
import { resourceState } from './resources';
import { trainingState } from './trainings';
import { localistEventsState } from './events';
import { gradesState } from './grades';

interface SearchItem {
  type: string;
  id: string;
  attr: {
    announcement?: Types.Announcement;
    event?: Types.LocalistEvent;
    grades?: Types.GradesAttributes;
    training?: Types.Training;
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
          type: 'event',
          id: event.id.toString(),
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
          type: 'announcement',
          id: announcement.id,
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
      type: 'grades',
      id: grade.id,
      attr: {
        grades: { ...grade.attributes },
      },
    }));
  },
});

const trainingSearchItems = selector<SearchItem[]>({
  key: 'trainingSearchItems',
  get: ({ get }) => {
    const trainings = get(trainingState);
    return trainings.data.map((training) => ({
      type: 'training',
      id: training.id,
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
      type: 'resource',
      id: resource.id,
      attr: {
        resource,
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
    'attr.announcement.action.title',
    'attr.announcement.body',
    'attr.announcement.title',
    'attr.event.action.title',
    'attr.event.body',
    'attr.event.title',
    'attr.event.city',
    'attr.grades.courseNumber',
    'attr.grades.courseReferenceNumber',
    'attr.grades.courseSubject',
    'attr.grades.courseSubjectDescription',
    'attr.grades.courseSubjectNumber',
    'attr.grades.courseTitle',
    'attr.grades.gradeFinal',
    'attr.resource.title',
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
    'attr.training.title',
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
    const items: SearchItem[] = [
      ...announcements,
      ...trainings,
      ...resources,
      ...events,
      ...grades,
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
