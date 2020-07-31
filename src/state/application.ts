import { atom, selector } from 'recoil';
import { User, Resources } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { defaultTheme } from 'src/theme/themes';
import { checkAffiliation, filterByCategory } from 'src/features/resources/resources-utils';

const getInitialCategory = () => {
  if (window.location.search.startsWith('?category=')) {
    const terms = window.location.search.split('=');
    if (terms.length === 2) {
      return decodeURI(terms[1]);
    }
  }
  return decodeURI(Resources.defaultCategoryName());
};

export const userState = atom<Types.UserState>({
  key: 'userState',
  default: { data: User.INITIAL_USER, loading: true, error: false },
});

export const categoryState = atom<{
  data: Types.Category[];
  isLoading: boolean;
  isSuccess: boolean;
}>({
  key: 'categoryState',
  default: { data: [], isLoading: true, isSuccess: false },
});

export const resourceState = atom<{
  data: Types.Resource[];
  isLoading: boolean;
  isSuccess: boolean;
}>({
  key: 'resourceState',
  default: { data: [], isLoading: true, isSuccess: false },
});

export const selectedCategoryState = atom<string>({
  key: 'selectedCategoryState',
  default: getInitialCategory(),
});

export const themeState = atom<string>({
  key: 'themeState',
  default: defaultTheme,
});

export const infoButtonState = atom<{ content: string; id: string; title: string }[]>({
  key: 'infoButtonState',
  default: [],
});

export const plannerItemState = atom<{
  data: Types.PlannerItem[];
  isLoading: boolean;
  error: Error | null;
}>({
  key: 'plannerItemState',
  default: { data: [], isLoading: false, error: null },
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

// Not intended for export; an internal selector for managing state.
const filteredResourcesBySearch = selector<Types.Resource[]>({
  key: 'filteredResourcesBySearch',
  get: ({ get }) => {
    const searchTerm = get(debouncedResourceSearchState);
    const query = searchTerm?.toLowerCase() ?? '';
    const resources = get(filteredResourcesByUserAffiliation);
    // When typing we search for synonyms and names to get results
    return resources.filter((resource) => {
      if (
        resource.synonyms.length > 0 &&
        resource.synonyms.find((s) => s.toLowerCase().includes(query))
      ) {
        return true;
      }
      return resource.title.toLowerCase().includes(query);
    });
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
