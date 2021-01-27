import { atom, selector, selectorFamily } from 'recoil';
import Fuse from 'fuse.js';
import { Types } from '@osu-wams/lib';
import { announcementState, ANNOUNCEMENT_PAGES } from './announcements';
import { resourceState } from './resources';
import { trainingState } from './trainings';

interface SearchItem {
  type: string;
  id: string;
  attr: {
    announcement?: Types.Announcement;
    training?: Types.Training;
    resource?: Types.Resource;
  };
}

const announcementSearchItems = selector<SearchItem[]>({
  key: 'announcementSearchItems',
  get: ({ get }) => {
    const announcements = [
      get(announcementState(ANNOUNCEMENT_PAGES.academics)),
      get(announcementState(ANNOUNCEMENT_PAGES.dashboard)),
      get(announcementState(ANNOUNCEMENT_PAGES.finances)),
    ];
    const all = announcements
      .map((a) =>
        a.data.map((announcement) => ({
          type: 'announcement',
          id: announcement.id,
          attr: {
            announcement,
          },
        }))
      )
      .reduce((p, v) => p.concat(v), []);
    // unique array of items based on thier item.id
    return Array.from(new Map(all.map((item) => [item.id, item])).values());
  },
});

const trainingSearchItems = selector<SearchItem[]>({
  key: 'trainingSearchItems',
  get: ({ get }) => {
    const trainings = get(trainingState);
    return trainings.data.map((training) => ({
      type: 'training',
      id: training.id,
      attr: {
        training,
      },
    }));
  },
});

const resourceSearchItems = selector<SearchItem[]>({
  key: 'resourceSearchItems',
  get: ({ get }) => {
    const resources = get(resourceState);
    return resources.data.map((resource) => ({
      type: 'resource',
      id: resource.id,
      attr: {
        resource,
      },
    }));
  },
});

const fuseOptions: Fuse.IFuseOptions<SearchItem> = {
  includeScore: true,
  minMatchCharLength: 2,
  threshold: 0.2,
  ignoreLocation: true,
  keys: [
    'attr.announcement.action.title',
    'attr.announcement.body',
    'attr.announcement.title',
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
    const announcements = get(announcementSearchItems);
    const trainings = get(trainingSearchItems);
    const resources = get(resourceSearchItems);
    const items: SearchItem[] = [...announcements, ...trainings, ...resources];
    return new Fuse(items, fuseOptions);
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
