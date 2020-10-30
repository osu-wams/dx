import React from 'react';
import { IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fal } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components/macro';
import { Types } from '@osu-wams/lib';
import { User } from '@osu-wams/hooks';
import Icon from 'src/ui/Icon';
import boxSync from 'src/assets/logo-box-sync.png';
import canvasLogo from 'src/assets/logo-canvas.png';
import gDrive from 'src/assets/logo-drive.png';
import gMail from 'src/assets/logo-gmail.png';
import zoom from 'src/assets/logo-zoom.png';

/**
 * Filters Resources which exist in the TrendingResources that match the users attributes
 * @param trendingResources
 * @param resourcesList
 */
const filteredTrendingResources = (
  trendingResources: Types.TrendingResource[],
  resourcesList: Types.Resource[],
  user: any
): Types.Resource[] => {
  const usersTrendingResources = trendingResources.filter((tr) => {
    const resource = resourcesList.find((r) => r.id === tr.resourceId);
    if (!resource) return false;
    return User.hasAudience(user, resource);
  });
  // Get the average number of unique events for a basic dynamic filtering mechanism
  const averageUniqueEvents =
    usersTrendingResources.reduce((p, c) => p + c.uniqueEvents, 0) / usersTrendingResources.length;
  // usersTrendingResources is sorted in descending order of most unique event count, return
  // a subset of the list filtered to the users properties along with only resources that have above average
  // number of unique events calculated. This gives a very basic way to focus on resources that are continually
  // getting clicks.
  const trendingResourceIds = usersTrendingResources
    .filter(({ uniqueEvents }) => uniqueEvents >= averageUniqueEvents)
    .map(({ resourceId }) => resourceId.toLowerCase());
  // filter the full resources list, the slice() to get a cloned array
  // to prevent sort() from mutating the resourcesList.. take a max of 10
  return resourcesList
    .filter(({ id }) => trendingResourceIds.includes(id.toLowerCase()))
    .slice()
    .sort(
      (a, b) =>
        trendingResourceIds.indexOf(a.id.toLowerCase()) -
        trendingResourceIds.indexOf(b.id.toLowerCase())
    )
    .slice(0, 10);
};

/**
 * Filters Resources to return just the ones a specific user has marked as favorite
 * @param favoriteResources
 * @param resourcesList
 */
const activeFavoriteResources = (
  favoriteResources: Types.FavoriteResource[],
  resourcesList: Types.Resource[]
) => {
  const hasActiveFavorite = (resourceId) =>
    favoriteResources.some((f) => f.active && f.resourceId === resourceId);

  return resourcesList.filter((f) => f !== undefined && hasActiveFavorite(f.id));
};

/**
 * Evaluates icons and displays fontawsome icon or explicit png
 * @param iconName string with the icon name
 */
const IconLookup = (iconName, color) => {
  if (iconName) {
    const iconSplit = iconName.split('.');
    if (iconSplit[0] === 'fal' || iconSplit[0] === 'fab') {
      const lookupIconDefinition: IconDefinition = findIconDefinition({
        prefix: iconSplit[0],
        iconName: iconSplit[1],
      });
      return <Icon icon={lookupIconDefinition} color={color} />;
    } else if (iconSplit[0] === 'osu') {
      return <ResourceImg src={logoMapping[iconSplit[1]]} alt={iconSplit[1]} />;
    } else {
      return <Icon icon={fal.faCube} color={color} />;
    }
  }
  return <Icon icon={fal.faCube} color={color} />;
};

const ResourceImg = styled.img`
  width: 3rem;
`;

/**
 * Mappings for all the pngs we need for services that might be rendered on the page.
 */
const logoMapping = {
  'logo-box-sync': boxSync,
  'logo-canvas': canvasLogo,
  'logo-drive': gDrive,
  'logo-gmail': gMail,
  'logo-zoom': zoom,
};

/**
 * Filter a list of resources where it has a category in its list matching the provided name
 * parameter unless the category is 'all'.
 * @param {string} name the category name to filter on
 * @param {Resource[]} resources a list of resources to inspect for matching category
 */
const filterByCategory = (
  user: any,
  name: string,
  resources: Types.Resource[]
): Types.Resource[] => {
  // Skips categories and displays all resources
  if (name === 'all') return resources;

  // Skips categories and filters based on user favorite preferences
  if (name === 'favorites' && user.favoriteResources) {
    return activeFavoriteResources(user.favoriteResources, resources);
  }

  return resources.filter(
    (resource) =>
      resource.categories?.length > 0 &&
      resource.categories.findIndex((s) => s.toLowerCase().includes(name.toLowerCase())) > -1
  );
};

/**
 * Checks the affiliation data coming from user and determines if an object with affiliation data
 * should or should not appear for the given user.
 * @param o object having an affiliation string array
 * @returns {boolean} true or false depending if the item is associated with the current affiliation
 */
const checkAffiliation = (user: any, o: { affiliation: string[] }): boolean => {
  const userAffiliation = User.getAffiliation(user).toLowerCase();
  return (
    o.affiliation?.length === 0 ||
    o.affiliation?.map((a) => a.toLowerCase()).filter((a) => a === userAffiliation).length > 0
  );
};

export {
  IconLookup,
  activeFavoriteResources,
  filteredTrendingResources,
  filterByCategory,
  checkAffiliation,
};
