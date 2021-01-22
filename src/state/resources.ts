import { atom, selector } from 'recoil';
import { Types } from '@osu-wams/lib';
import { checkAffiliation, filterByCategory } from 'src/features/resources/resources-utils';
import { selectedCategoryState, userState } from './application';
import { searchIndex } from './search';

export const resourceState = atom<{
  data: Types.Resource[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'resourceState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

/**
 * The state of the resource search bar value, this can change rapidly and
 * is reflected by the value entered in the input field in the UI. This value
 * is intended to be consumed by a useDebounce hook and useEffect to eventually set the value
 * of debouncedResourceSearchState with.
 */
export const resourceSearchState = atom<string>({
  key: 'resourceSearchState',
  default: '',
});

/**
 * After an elapsed period of time specified in a useDebounce hook, a related
 * useEffect would set the value of this state which is used by other selectors or hooks.
 * This value is a search term after the user has stopped typing for a period of time, and it will
 * initiate searching and filtering the resources.
 */
export const debouncedResourceSearchState = atom<string | undefined>({
  key: 'debouncedResourceSearchState',
  default: undefined,
});

// Not intended for export; an internal selector for managing state.
const filteredResourcesByUserAffiliation = selector<Types.Resource[]>({
  key: 'filteredResourcesByUserAffiliation',
  get: ({ get }) => {
    const user = get(userState);
    const resources = get(resourceState);
    return resources.data.filter((r) => checkAffiliation(user.data, r));
  },
});

// Not intended for export; an internal selector for managing state.
const filteredResourcesByCategory = selector<Types.Resource[]>({
  key: 'filteredResourcesByCategory',
  get: ({ get }) => {
    const user = get(userState);
    const resources = get(filteredResourcesByUserAffiliation);
    const selectedCategory = get(selectedCategoryState);
    return filterByCategory(user.data, selectedCategory, resources);
  },
});

// Not intended for export; an internal selector for managing state and
// filtering resources when a search term is set.
const filteredResourcesBySearch = selector<Types.Resource[]>({
  key: 'filteredResourcesBySearch',
  get: ({ get }) => {
    const searchTerm = get(debouncedResourceSearchState);
    const query = searchTerm?.toLowerCase() ?? '';
    const resources = get(filteredResourcesByUserAffiliation);
    if (!query) {
      return resources;
    }
    const found = get(searchIndex(query));
    const foundIds = found.filter((i) => i.item.attr.resource).map((i) => i.item.attr.resource!.id);
    return resources.filter((r) => foundIds.includes(r.id));
  },
});

/**
 * If debouncedQuery is reset to its default (undefined), then return
 * all resources filtered by category, otherwise return the resources
 * filtered by the search term entered.
 */
export const filteredResourcesState = selector<Types.Resource[]>({
  key: 'filteredResourcesState',
  get: ({ get }) => {
    const debouncedQuery = get(debouncedResourceSearchState);
    if (!debouncedQuery) {
      return get(filteredResourcesByCategory);
    } else {
      return get(filteredResourcesBySearch);
    }
  },
});
