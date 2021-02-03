import { atom, selector } from 'recoil';
import { Types } from '@osu-wams/lib';
import { searchIndex } from './search';

export const gradesState = atom<{
  data: Types.Grades[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}>({
  key: 'gradesState',
  default: { data: [], isLoading: true, isSuccess: false, isError: false },
});

/**
 * The state of the past courses search bar value, this can change rapidly and
 * is reflected by the value entered in the input field in the UI. This value
 * is intended to be consumed by a useDebounce hook and useEffect to eventually set the value
 * of debouncedGradesSearchState with.
 */
export const gradesSearchState = atom<string>({
  key: 'gradesSearchState',
  default: '',
});

/**
 * After an elapsed period of time specified in a useDebounce hook, a related
 * useEffect would set the value of this state which is used by other selectors or hooks.
 * This value is a search term after the user has stopped typing for a period of time, and it will
 * initiate searching and filtering the grades.
 */
export const debouncedGradesSearchState = atom<string | undefined>({
  key: 'debouncedGradesSearchState',
  default: undefined,
});

// Not intended for export; an internal selector for managing state and
// filtering grades when a search term is set.
const filteredGradesBySearch = selector<Types.Grades[]>({
  key: 'filteredGradesBySearch',
  get: ({ get }) => {
    const searchTerm = get(debouncedGradesSearchState);
    const grades = get(gradesState);
    const query = searchTerm?.toLowerCase() ?? '';
    const found = get(searchIndex(query));
    const foundIds = found.filter((i) => i.item.attr.grades).map((i) => i.item.id);
    console.log(grades.data, found, foundIds);
    return grades.data.filter((r) => foundIds.includes(r.id));
  },
});

/**
 * If debouncedQuery is reset to its default (undefined), then return
 * all grades, otherwise return the grades filtered by the search term entered.
 */
export const filteredGradesState = selector<Types.Grades[]>({
  key: 'filteredGradesState',
  get: ({ get }) => {
    const debouncedQuery = get(debouncedGradesSearchState);
    if (!debouncedQuery) {
      const grades = get(gradesState);
      return grades.data;
    } else {
      return get(filteredGradesBySearch);
    }
  },
});
