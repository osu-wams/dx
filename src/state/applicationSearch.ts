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
  employeeOnly?: boolean;
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
    trainings:      { checked: false, label: 'Trainings',       name: 'trainings',      type: 'Training', employeeOnly: true, },
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

export const selectedTypeFilters = selector<string[]>({
  key: 'selectedTypeFilters',
  get: ({ get }) => {
    const typesFilter = get(applicationTypeFilterState);
    return typesFilter.filter((t) => t.type && t.checked).map((t) => t.type!);
  },
});

export const selectedAudienceFilters = selector<string[]>({
  key: 'selectedAudienceFilters',
  get: ({ get }) => {
    const audienceFilter = get(applicationAudienceFilterState);
    return audienceFilter.filter((a) => a.audience && a.checked).map((a) => a.audience!);
  },
});

export const selectedCampusFilters = selector<string[]>({
  key: 'selectedCampusFilters',
  get: ({ get }) => {
    const campusFilter = get(applicationCampusFilterState);
    return campusFilter.filter((c) => c.campus && c.checked).map((c) => c.campus!);
  },
});

export const filteredApplicationSearchState = selector<Fuse.FuseResult<SearchItem>[]>({
  key: 'filteredApplicationSearchState',
  get: ({ get }) => {
    const query = get(applicationSearchState);
    const selectedTypes = get(selectedTypeFilters);
    const selectedAudience = get(selectedAudienceFilters);
    const selectedCampuses = get(selectedCampusFilters);

    if (!query) {
      return [];
    } else {
      const found = get(searchIndex(query));
      const filtered = found
        // Return items to match type filters set or all items if no filters are set
        .filter(({ item: { type } }) => {
          if (!selectedTypes.length) return true;
          return selectedTypes.includes(type);
        })
        // Return items to match campus filters set or all items if no filters are set
        .filter(({ item: { campuses } }) => {
          if (!selectedCampuses.length || !campuses?.length) return true;
          return campuses.some((itemCampus) => selectedCampuses.indexOf(itemCampus) > -1);
        })
        // Return items to match audience filters set or all items if no filters are set
        .filter(({ item: { audience } }) => {
          if (!selectedAudience.length || !audience?.length) return true;
          return audience.some((itemAudience) => selectedAudience.indexOf(itemAudience) > -1);
        });
      return filtered;
    }
  },
});
