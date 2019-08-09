import React from 'react';
import styled from 'styled-components';
import { Color, theme } from '../../theme';
import { IResourceResult } from '../../api/resources';

const ResourcesList: React.FC<any> = ({ resources }) => (
  <>
    {resources.length > 0 &&
      resources.map((result:IResourceResult) => (
        <Resource key={result.id} href={result.uri} target="_blank">
          <img src={result.icon} height="20px" />
          <ResourceName>{result.title}</ResourceName>
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
