import React from 'react';
import { IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fal } from '@fortawesome/pro-light-svg-icons';
import Icon from '../../ui/Icon';
import boxSync from '../../assets/logo-box-sync.png';
import canvasLogo from '../../assets/logo-canvas.png';
import gDrive from '../../assets/logo-drive.png';
import gMail from '../../assets/logo-gmail.png';
import zoom from '../../assets/logo-zoom.png';
import { styled } from '../../theme';

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

export { IconLookup };
