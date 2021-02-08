import Fuse from 'fuse.js';
import { atom, selector } from 'recoil';
import { SearchItem, searchIndex } from './search';

export interface FilterState {
  checked: boolean;
  type?: string;
  audience?: string;
  campus?: string;
}

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
