import { atom, selector, selectorFamily } from 'recoil';
import Fuse from 'fuse.js';
import { User } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { defaultTheme } from 'src/theme/themes';
import { checkAffiliation, filterByCategory } from 'src/features/resources/resources-utils';

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
  isError: boolean;
}>({
  key: 'resourceState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

export const selectedCategoryState = atom<string>({
  key: 'selectedCategoryState',
  default: '',
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

/**
 * Once the resources items state is resolved with data from the server, create a fuse searchable
 * index for another selector to operate on. The options are spit-balled to give fairly fuzzy
 * searching without regard to where at in the keys the pattern is found (not necessarily the
 * beginning of the matched words).
 *
 * If the resourceState is changed (refreshed from the server), the index is recreated and kept
 * fresh.
 */
const resourceSearchIndex = selector<Fuse<Types.Resource> | undefined>({
  key: 'resourceSearchIndex',
  get: ({ get }) => {
    const resources = get(resourceState);
    if (resources.data.length) {
      const options: Fuse.IFuseOptions<Types.Resource> = {
        includeScore: true,
        keys: ['title', 'synonyms'],
        minMatchCharLength: 2,
        threshold: 0.2,
        ignoreLocation: true,
      };
      // create index
      const fuse = new Fuse(resources.data, options);
      return fuse;
    }
    return undefined;
  },
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
    const searchIndex = get(resourceSearchIndex);
    if (searchIndex) {
      const found = searchIndex.search(query);
      const foundIds = found.map((f) => f.item.id);
      // When typing we search for synonyms and names to get results
      return resources.filter((resource) => foundIds.includes(resource.id));
    } else {
      return resources;
    }
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

/**
 * Local state for all the user messages
 */
export const userMessagesState = atom<Types.UserMessagesState>({
  key: 'userMessagesState',
  default: { data: [], isLoading: true, isSuccess: false },
});

/**
 * Allows to filter notifications by their status or not at all
 */
export const filteredNotifications = selectorFamily<Types.UserMessagesState, string>({
  key: 'filteredNotifications',
  get: (filter) => ({ get }) => {
    const notifications = get(userMessagesState);

    let filtered = notifications.data;
    if (notifications && notifications.data && notifications.data.length > 0) {
      switch (filter) {
        case 'unread':
          filtered = notifications.data.filter(
            (m: Types.UserMessage) => m.status.toLowerCase() !== 'read'
          );
          break;

        case 'read':
          filtered = notifications.data.filter(
            (m: Types.UserMessage) => m.status.toLowerCase() === 'read'
          );
          break;
      }
    }
    return {
      ...notifications,
      data: filtered,
    };
  },
});

export const dynamicCardState = atom<{
  data: Types.DynamicCard[];
  isLoading: boolean;
  isSuccess: boolean;
}>({
  key: 'dynamicCardState',
  default: { data: [], isLoading: true, isSuccess: false },
});

export const filteredCards = selectorFamily<Types.DynamicCard[], string>({
  key: 'dynamicCardsWithResources',
  get: (page) => ({ get }) => {
    const cards = get(dynamicCardState);
    const resources = get(resourceState);
    if (cards.data.length && resources.data.length) {
      return cards.data
        .filter((c) => c.pages.includes(page))
        .map((c) => ({
          ...c,
          resources:
            c.resources?.map(
              (resourceId) => resources.data.find((r) => r.id === resourceId) ?? resourceId
            ) ?? [],
        }));
    }
    return [];
  },
});
