import { atom, useRecoilState, useRecoilValue, selectorFamily, selector } from 'recoil';
import { Resources } from '@osu-wams/hooks';

export const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});

export const categoriesState = atom({
  key: 'categoriesState',
  default: [],
});

export const resourcesState = atom({
  key: 'resourcesState',
  default: [],
});

export const activeCategoryState = atom({
  key: 'activeCategoryState',
  default: 'all',
});

export const fetchCategories = selector({
  key: 'fetchCategories',
  get: async ({ get }) => {
    const res = await Resources.getCategories();
    return { data: res, loading: false, error: false };
  },
});

export const fetchResources = selector({
  key: 'fetchResources',
  get: async ({ get }) => {
    const res = await Resources.getResources();
    return { data: res, loading: false, error: false };
  },
});

export const resourceSearch = selector({
  key: 'resourceSearch',
  get: ({ get }) => {
    const resources = get(resourcesState);
    const text = get(searchTermState);
    if (text.length > 0) {
      return resources.filter((resource) => {
        if (
          resource.synonyms.length > 0 &&
          resource.synonyms.find((s) => s.includes(text.toLowerCase()))
        ) {
          return true;
        }
        return resource.title.toLowerCase().includes(text.toLowerCase());
      });
    } else {
      return resources;
    }
  },
});
