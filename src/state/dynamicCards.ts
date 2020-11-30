import { atom, selectorFamily } from 'recoil';
import { User } from '@osu-wams/hooks';
import { Types } from '@osu-wams/lib';
import { resourceState } from './resources';
import { userState } from './application';

export const dynamicCardState = atom<{
  data: Types.DynamicCard[];
  isLoading: boolean;
  isSuccess: boolean;
}>({
  key: 'dynamicCardState',
  default: { data: [], isLoading: true, isSuccess: false },
});

/**
 * Given the page name provided to the filter, gather shared application state for the
 * user, resources and cards to filter and map to return a list of DynamicCards that
 * this particular should see on a specific page.
 * @param page - the page name being rendered
 */
export const filteredCards = selectorFamily<Types.DynamicCard[], string>({
  key: 'dynamicCardsWithResources',
  get: (page) => ({ get }) => {
    const cards = get(dynamicCardState);
    const resources = get(resourceState);
    const user = get(userState);
    if (!user.loading && cards.data.length && resources.data.length) {
      // Filter cards;
      // - using the provided page arg, filter cards with the page included
      // - using the user state, filter cards that apply to the common hasAudience logic
      const filtered = cards.data
        .filter((c) => c.pages.map((p) => p.toLowerCase()).includes(page.toLowerCase()))
        .filter((c) =>
          User.hasAudience(user.data, {
            locations: c.locations,
            audiences: c.audiences ?? [],
            affiliation: c.affiliation,
          })
        );
      // Map filtered cards to replace resource id's to be the full model instance
      // data for the resource from the shared application state. If the resource id
      // isn't found in the shared state, return its original resource id for debugging purposes
      return filtered.map((c) => ({
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
