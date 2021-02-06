import Fuse from 'fuse.js';
import { atom, selector } from 'recoil';
import { SearchItem, searchIndex } from './search';

export const applicationSearchState = atom<string>({
  key: 'applicationSearchState',
  default: '',
});

export const applicationTypeFilterState = atom<string[]>({
  key: 'applicationTypeFilterState',
  default: [],
});

export const applicationAudienceFilterState = atom<string[]>({
  key: 'applicationAudienceFilterState',
  default: [],
});

export const applicationCampusFilterState = atom<string[]>({
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
      return found.filter((i) => types.includes(i.item.type));
    }
  },
});
