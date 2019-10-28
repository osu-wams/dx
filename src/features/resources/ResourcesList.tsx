import React from 'react';
import styled from 'styled-components';
import { faCube } from '@fortawesome/pro-light-svg-icons';
import { PoseGroup } from 'react-pose';
import Icon from '../../ui/Icon';
import { List, ListItemAnimated, ListItemContentLink } from '../../ui/List';
import { Color, theme } from '../../theme';
import { IResourceResult } from '../../api/resources';
import { Event } from '../../util/gaTracking';

const ResourcesList: React.FC<{ resources: IResourceResult[] }> = ({ resources }) => (
  <List aria-live="polite" aria-atomic="true">
    {resources && `found ${resources.length} results`}
    <PoseGroup>
      {resources.length > 0 &&
        resources.map((resource: IResourceResult) => (
          <ListItemAnimated spaced key={resource.id} pose="closed">
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
          </ListItemAnimated>
        ))}
    </PoseGroup>
  </List>
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
