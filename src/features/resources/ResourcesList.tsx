import React from 'react';
import styled from 'styled-components';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { List, ListItem, ListItemContentLink } from '../../ui/List';
import { Color, theme } from '../../theme';
import { IResourceResult } from '../../api/resources';
import { Event } from '../../util/gaTracking';
import { singularPlural } from '../../util/helpers';
import { IconLookup } from './resources-utils';

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
              {IconLookup(resource.iconName)}
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

export default ResourcesList;
