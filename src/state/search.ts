import { selector, selectorFamily } from 'recoil';
import Fuse from 'fuse.js';
import { Types } from '@osu-wams/lib';
import { trainingState } from './trainings';
import { resourceState } from './resources';

interface SearchItem {
  type: string;
  id: string;
  attr: {
    training?: Types.Training;
    resource?: Types.Resource;
  };
}

const fuseOptions: Fuse.IFuseOptions<SearchItem> = {
  includeScore: true,
  minMatchCharLength: 2,
  threshold: 0.2,
  ignoreLocation: true,
  keys: [
    'attr.resource.title',
    'attr.resource.synonyms',
    'attr.training.audiences',
    'attr.training.body',
    'attr.training.contact',
    'attr.training.cost',
    'attr.training.courseDesign',
    'attr.training.department',
    'attr.training.duration',
    'attr.training.frequency',
    'attr.training.prerequisites',
    'attr.training.tags',
    'attr.training.title',
    'attr.training.type',
    'attr.training.websiteTitle',
    'attr.training.websiteUri',
  ],
};

export const fuseIndex = selector<Fuse<SearchItem>>({
  key: 'fuseIndex',
  get: ({ get }) => {
    const trainings = get(trainingState);
    const resources = get(resourceState);
    const data: SearchItem[] = [
      ...trainings.data.map((training) => ({
        type: 'training',
        id: training.id,
        attr: {
          training,
        },
      })),
      ...resources.data.map((resource) => ({
        type: 'resource',
        id: resource.id,
        attr: {
          resource,
        },
      })),
    ];
    return new Fuse(data, fuseOptions);
  },
});

export const searchIndex = selectorFamily<Fuse.FuseResult<SearchItem>[], string>({
  key: 'searchIndex',
  get: (query) => ({ get }) => {
    const index = get(fuseIndex);
    const results = index.search(query);
    return results;
  },
});
