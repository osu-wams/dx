import ReactGA from 'react-ga';
import { Types } from '@osu-wams/lib';

/**
 * TrendingEvent - tracks trending events
 * @param {Types.Resource} resource
 * @param {Types.User} user
 */
export const TrendingEvent = (resource: Types.Resource, user: Types.User) => {
  const category = 'trending-resource';
  const action = resource.id;

  // Determines: Employee or Student
  const affiliation = user.primaryAffiliation ?? '';

  // Campus for employees is empty - defaulting to Corvallis for now
  const campus = user.classification?.attributes?.campus ?? 'Corvallis';

  let label = `${affiliation} || ${campus} || ${resource.title}`;

  ReactGA.event({
    category,
    action,
    label
  });
};
