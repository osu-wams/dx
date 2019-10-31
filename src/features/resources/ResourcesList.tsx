import React from 'react';
import styled from 'styled-components';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import Icon from '../../ui/Icon';
import { List, ListItem, ListItemContentLink } from '../../ui/List';
import { Color, theme } from '../../theme';
import { IResourceResult } from '../../api/resources';
import { Event } from '../../util/gaTracking';
import { singularPlural } from '../../util/helpers';

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
              {resource.icon !== undefined ? (
                <ResourceImg src={resource.icon} alt="" />
              ) : (
                <ResourceIcon icon={faCube} color={Color.black} />
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

const ResourceIcon = styled(Icon)`
  height: auto;
`;

export default ResourcesList;
