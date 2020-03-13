import React from 'react';
import { IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { Types } from '@osu-wams/lib';
import Icon from 'src/ui/Icon';
import boxSync from 'src/assets/logo-box-sync.png';
import canvasLogo from 'src/assets/logo-canvas.png';
import gDrive from 'src/assets/logo-drive.png';
import gMail from 'src/assets/logo-gmail.png';
import zoom from 'src/assets/logo-zoom.png';
import { styled } from 'src/theme';

/**
 * Filters Resources to return just the ones a specific user has marked as favorite
 * @param favoriteResources
 * @param resourcesList
 */
const activeFavoriteResources = (
  favoriteResources: Types.FavoriteResource[],
  resourcesList: Types.Resource[]
) => {
  const hasActiveFavorite = resourceId =>
    favoriteResources.some(f => f.active && f.resourceId === resourceId);

  return resourcesList.filter(f => f !== undefined && hasActiveFavorite(f.id));
};

/**
 * Evaluates icons and displays fontawsome icon or explicit png
 * @param iconName string with the icon name
 */
const IconLookup = (iconName, color) => {
  if (iconName !== undefined) {
    const iconSplit = iconName.split('.');
    if (iconSplit[0] === 'fal' || iconSplit[0] === 'fab') {
      const lookupIconDefinition: IconDefinition = findIconDefinition({
        prefix: iconSplit[0],
        iconName: iconSplit[1]
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
  'logo-zoom': zoom
};

export { IconLookup, activeFavoriteResources };
