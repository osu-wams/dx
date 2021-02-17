import Fuse from 'fuse.js';
import { atom, selector } from 'recoil';
import { SearchItem, searchIndex } from './search';

export interface FilterState {
  checked: boolean;
  label: string;
  name: string;
  type?: string;
  audience?: string;
  campus?: string;
  hiddenFrom?: string[];
}

// Keep my sweet formatting for readability
// prettier-ignore
export const applicationFilterState = atom<{ [key: string]: FilterState }>({
  key: 'applicationFilterState',
  default: {
    // Type Filters
    announcements:  { checked: false, label: 'Announcements',   name: 'announcements',  type: 'Announcement', },
    canvas:         { checked: false, label: 'Canvas',          name: 'canvas',         type: 'Canvas' },
    courses:        { checked: false, label: 'Current Courses', name: 'courses',        type: 'Current Course' },
    events:         { checked: false, label: 'Events',          name: 'events',         type: 'Event' },
    notifications:  { checked: false, label: 'Notifications',   name: 'notifications',  type: 'Notification', },
    pastCourses:    { checked: false, label: 'Past Courses',    name: 'pastCourses',    type: 'Past Course', },
    resources:      { checked: false, label: 'Resources',       name: 'resources',      type: 'Resource' },
    trainings:      { checked: false, label: 'Trainings',       name: 'trainings',      type: 'Training', hiddenFrom: ['student'], },
    // Audience Filters
    employees:  { checked: false, label: 'Employees', name: 'employees',  audience: 'employee' },
    students:   { checked: false, label: 'Students',  name: 'students',   audience: 'student' },
    // Campus Filters
    bend:       { checked: false, label: 'Bend',      name: 'bend',       campus: 'bend' },
    corvallis:  { checked: false, label: 'Corvallis', name: 'corvallis',  campus: 'corvallis' },
    ecampus:    { checked: false, label: 'Ecampus',   name: 'ecampus',    campus: 'ecampus' },
  },
});

export const applicationSearchMobileFilterState = atom<boolean>({
  key: 'applicationSearchMobileFilterState',
  default: false,
});

export const applicationSearchState = atom<string>({
  key: 'applicationSearchState',
  default: '',
});

export const applicationTypeFilterState = atom<FilterState[]>({
  key: 'applicationTypeFilterState',
  default: [],
});

export const applicationAudienceFilterState = atom<FilterState[]>({
  key: 'applicationAudienceFilterState',
  default: [],
});

export const applicationCampusFilterState = atom<FilterState[]>({
  key: 'applicationCampusFilterState',
  default: [],
});

export const filteredApplicationSearchState = selector<Fuse.FuseResult<SearchItem>[]>({
  key: 'filteredApplicationSearchState',
  get: ({ get }) => {
    const query = get(applicationSearchState);
    const types = get(applicationTypeFilterState);
    // const audiences = get(applicationAudienceFilterState);
    // const campuses = get(applicationCampusFilterState);
    if (!query) {
      return [];
    } else {
      const found = get(searchIndex(query));
      // TODO: filter by audience and campus as well, do these fields need to be at the item level?
      if (!types.length) {
        return found;
      }
      return found.filter((i) => types.map((t) => t.type).includes(i.item.type));
    }
  },
});
