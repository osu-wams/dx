import { atom, useRecoilState, useRecoilValue, selectorFamily, selector } from 'recoil';

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

// export const resources = selector({
//   key: 'resources',
//   get: async ({ get }) => {
//     const res = await useResources();
//     return res;
//   },
// });

export const resourceSearch = selector({
  key: 'resourceSearch',
  get: ({ get }) => {
    const resources = get(resourcesState);
    const text = get(searchTermState);
    if (text.length > 0) {
      resources.filter((resource) => {
        // if (
        //   resource.synonyms.length > 0 &&
        //   resource.synonyms.find((s) => s.includes(text.toLowerCase()))
        // ) {
        //   return true;
        // }
        return resource.title.toLowerCase().includes(text.toLowerCase());
      });
    } else {
      return resources;
    }
  },
});
