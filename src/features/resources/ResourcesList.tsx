import React from 'react';
import styled from 'styled-components';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import Icon from '../../ui/Icon';
import { List, ListItem, ListItemContentLink } from '../../ui/List';
import { Color, theme } from '../../theme';
import { IResourceResult } from '../../api/resources';
import { Event } from '../../util/gaTracking';
import { singularPlural } from '../../util/helpers';
import boxSync from '../../assets/logo-box-sync.png';
import canvasLogo from '../../assets/logo-canvas.png';
import gDrive from '../../assets/logo-drive.png';
import gMail from '../../assets/logo-gmail.png';
import zoom from '../../assets/logo-zoom.png';
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

// Setup a font awesome library to use for searching for icons from the backend.
library.add(fal, fab);
const ResourcesList: React.FC<{ resources: IResourceResult[] }> = ({ resources }) => (
  <div id="resourcesResults" data-testid="resourcesResults" aria-live="polite" aria-atomic="true">
    {resources && `found ${resources.length} ${singularPlural(resources.length, 'result')}`}
    <List>
      {resources.length > 0 &&
        resources.map((resource: IResourceResult) => (
          <ListItem spaced key={resource.id}>
            <ListItemContentLink
              spaced
              href={resource.link}
              onClick={() => Event('resource', resource.title)}
              target="_blank"
            >
              {resource.iconName !== undefined ? (
                IconLookupCustom(resource.iconName)
              ) : (
                <Icon icon={fal.faCube} color={Color['neutral-550']} />
              )}
              <ResourceName>{resource.title}</ResourceName>
            </ListItemContentLink>
          </ListItem>
        ))}
    </List>
  </div>
);

const ResourceName = styled.div`
  font-size: ${theme.fontSize[18]};
  color: ${Color['neutral-700']};
  padding-left: ${theme.spacing.unit * 2}px;
`;

const ResourceImg = styled.img`
  width: 3rem;
`;
const IconLookupCustom = iconName => {
  const iconSplit = iconName.split('.');
  if (iconSplit[0] === 'fal' || iconSplit[0] === 'fab') {
    const lookupIconDefinition: IconDefinition = findIconDefinition({
      prefix: iconSplit[0],
      iconName: iconSplit[1]
    });
    return <Icon icon={lookupIconDefinition} color={Color['neutral-550']} />;
  } else if (iconSplit[0] === 'osu') {
    return <ResourceImg src={logoMapping[iconSplit[1]]} alt={iconSplit[1]} />;
  } else {
    return <Icon icon={fal.faCube} color={Color.black} />;
  }
};
export default ResourcesList;
