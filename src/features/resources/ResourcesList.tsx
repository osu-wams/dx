import React from 'react';
import styled from 'styled-components';
import { Color, theme } from '../../theme';

const ResourcesList: React.FC<any> = ({ resources }) => (
  <>
    {resources.length > 0 &&
      resources.map(({ id, title, icon, uri, field_service_description }) => (
        <Resource key={id} href={uri} target="_blank">
          <img src={icon} height="20px" />
          <ResourceName>{title}</ResourceName>
          <ResourceDescription>{field_service_description}</ResourceDescription>
        </Resource>
      ))}
  </>
);

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
