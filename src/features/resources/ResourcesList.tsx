import React, { useContext } from 'react';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { List, ListItem, ListItemContentLinkSVG, ListItemContentLinkName } from '../../ui/List';
import { IResourceResult } from '../../api/resources';
import { Event } from '../../util/gaTracking';
import { singularPlural } from '../../util/helpers';
import { IconLookup } from './resources-utils';
import { ThemeContext } from '../../theme';

// Setup a font awesome library to use for searching for icons from the backend.
library.add(fal, fab);
const ResourcesList: React.FC<{ resources: IResourceResult[] }> = ({ resources }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <div id="resourcesResults" data-testid="resourcesResults" aria-live="polite" aria-atomic="true">
      {`found ${resources?.length} ${singularPlural(resources?.length, 'result')}`}
      <List>
        {resources.length > 0 &&
          resources.map((resource: IResourceResult) => (
            <ListItem spaced key={resource.id}>
              <ListItemContentLinkSVG
                spaced
                href={resource.link}
                onClick={() => Event('resource', resource.title)}
                target="_blank"
              >
                {IconLookup(resource.iconName, themeContext.features.resources.icon.color)}
                <ListItemContentLinkName>{resource.title}</ListItemContentLinkName>
              </ListItemContentLinkSVG>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ResourcesList;
