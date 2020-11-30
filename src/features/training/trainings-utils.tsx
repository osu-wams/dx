import { Types } from '@osu-wams/lib';

/**
 * Filter a list of trainings where it has a tag in its list matching the provided name
 * parameter unless the tag is 'all'.
 * @param {string} name the tag name to filter on
 * @param {Training[]} trainings a list of trainings to inspect for matching tag
 */
const filterByTag = (user: any, name: string, trainings: Types.Training[]): Types.Training[] => {
  // Skips tags and displays all
  if (name === 'all') return trainings;

  return trainings.filter(
    (t) =>
      t.tags?.length > 0 &&
      t.tags.findIndex((tag) => tag.toLowerCase().includes(name.toLowerCase())) > -1
  );
};

export { filterByTag };
