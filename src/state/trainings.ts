import { atom, selector } from 'recoil';
import Fuse from 'fuse.js';
import { Types } from '@osu-wams/lib';
import { filterByProperties } from 'src/features/training/trainings-utils';

export const trainingAudienceState = atom<{
  data: any[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'trainingAudienceState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

export const selectedTrainingAudienceState = atom<string>({
  key: 'selectedTrainingAudienceState',
  default: 'all',
});

export const trainingTagState = atom<{
  data: Types.TrainingTag[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'trainingTagState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

export const selectedTrainingTagState = atom<string>({
  key: 'selectedTrainingTagState',
  default: 'all',
});

export const trainingState = atom<{
  data: Types.Training[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'trainingState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

/**
 * The state of the training search bar value, this can change rapidly and
 * is reflected by the value entered in the input field in the UI. This value
 * is intended to be consumed by a useDebounce hook and useEffect to eventually set the value
 * of debouncedTrainigSearchState with.
 */
export const trainingSearchState = atom<string>({
  key: 'trainingSearchState',
  default: '',
});

/**
 * After an elapsed period of time specified in a useDebounce hook, a related
 * useEffect would set the value of this state which is used by other selectors or hooks.
 * This value is a search term after the user has stopped typing for a period of time, and it will
 * initiate searching and filtering the trainings.
 */
export const debouncedTrainingSearchState = atom<string | undefined>({
  key: 'debouncedTrainingSearchState',
  default: undefined,
});

/**
 * Once the trainings state is resolved with data from the server, create a fuse searchable
 * index for another selector to operate on. The options are spit-balled to give fairly fuzzy
 * searching without regard to where at in the keys the pattern is found (not necessarily the
 * beginning of the matched words).
 *
 * If the trainingState is changed (refreshed from the server), the index is recreated and kept
 * fresh.
 */
const trainingSearchIndex = selector<Fuse<Types.Training> | undefined>({
  key: 'trainingSearchIndex',
  get: ({ get }) => {
    const trainings = get(trainingState);
    if (trainings.data.length) {
      const options: Fuse.IFuseOptions<Types.Training> = {
        includeScore: true,
        keys: [
          'audiences',
          'body',
          'contact',
          'cost',
          'courseDesign',
          'department',
          'duration',
          'frequency',
          'prerequisites',
          'tags',
          'title',
          'type',
          'websiteTitle',
          'websiteUri',
        ],
        minMatchCharLength: 2,
        threshold: 0.2,
        ignoreLocation: true,
      };
      // create index
      const fuse = new Fuse(trainings.data, options);
      return fuse;
    }
    return undefined;
  },
});

// Not intended for export; an internal selector for managing state.
const filteredTrainings = selector<Types.Training[]>({
  key: 'filteredTrainings',
  get: ({ get }) => {
    const trainings = get(trainingState);
    const selectedTag = get(selectedTrainingTagState);
    const selectedAudience = get(selectedTrainingAudienceState);
    return filterByProperties(selectedTag, selectedAudience, trainings.data);
  },
});

// Not intended for export; an internal selector for managing state and
// filtering trainings when a search term is set.
const filteredTrainingsBySearch = selector<Types.Training[]>({
  key: 'filteredTrainingsBySearch',
  get: ({ get }) => {
    const searchTerm = get(debouncedTrainingSearchState);
    const query = searchTerm?.toLowerCase() ?? '';
    const trainings = get(filteredTrainings);
    const searchIndex = get(trainingSearchIndex);
    if (searchIndex && query) {
      const found = searchIndex.search(query);
      const foundIds = found.map((f) => f.item.id);
      return trainings.filter((t) => foundIds.includes(t.id));
    } else {
      return trainings;
    }
  },
});

/**
 * If debouncedQuery is reset to its default (undefined), then return
 * all trainings filtered by tag, otherwise return the trainings
 * filtered by the search term entered.
 */
export const filteredTrainingsState = selector<Types.Training[]>({
  key: 'filteredTrainingsState',
  get: ({ get }) => {
    const debouncedQuery = get(debouncedTrainingSearchState);
    if (!debouncedQuery) {
      return get(filteredTrainings);
    } else {
      return get(filteredTrainingsBySearch);
    }
  },
});
