import { Types } from '@osu-wams/lib';

/**
 * Filter a list of trainings where it has a tag in its list matching the provided name
 * parameter unless the tag is 'all'.
 * @param {string} tag the tag name to filter on
 * @param {string} audience the audience name to filter on
 * @param {Training[]} trainings a list of trainings to inspect for matching tag
 */
const filterByProperties = (
  tag: string,
  audience: string,
  trainings: Types.Training[]
): Types.Training[] => {
  if (tag === 'all' && audience === 'all') return trainings;

  let filtered = trainings;
  if (audience !== 'all') {
    filtered = filtered.filter(
      (t) =>
        t.audiences?.length > 0 &&
        t.audiences.findIndex((ad) => ad?.toLowerCase() === audience.toLowerCase()) > -1
    );
  }
  if (tag !== 'all') {
    filtered = filtered.filter(
      (t) =>
        t.tags?.length > 0 && t.tags.findIndex((ta) => ta?.toLowerCase() === tag.toLowerCase()) > -1
    );
  }
  return filtered;
};

export { filterByProperties };
