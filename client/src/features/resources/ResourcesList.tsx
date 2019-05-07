import React from 'react';
import styled from 'styled-components';
import { Color, theme } from '../../theme';

const ResourcesList = ({ resources }) => {
  return (
    <div>
      {resources.length > 0 &&
        resources.map(resource => (
          <Resource
            key={resource.id}
            href={resource.attributes.field_service_url.uri}
            target="_blank"
          >
            <ResourceName>{resource.attributes.title}</ResourceName>
            <ResourceDescription>
              {resource.attributes.field_service_description}
            </ResourceDescription>
          </Resource>
        ))}
    </div>
  );
};

const Resource = styled.a`
  padding: ${theme.spacing.unit * 2}px;
  display: block;
  text-decoration: none;
`;

const ResourceName = styled.div`
  font-size: ${theme.fontSize[18]};
  color: ${Color['neutral-700']};
`;

const ResourceDescription = styled.div`
  color: ${Color['neutral-600']};
`;

export default ResourcesList;
