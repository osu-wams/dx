import React from 'react';
import styled from 'styled-components/macro';
import { Types } from '@osu-wams/lib';
import { ListItemContent, ListItemText } from 'src/ui/List';

const ListCountStyle = styled(ListItemContent)`
  font-style: italic;
  font-weight: 200;
  padding-bottom: 0;
  > div {
    text-align: right;
  }
`;

const getErrorMessage = (
  defaultError: string,
  error: Error & { response?: { data: string } }
): string => error?.response?.data ?? defaultError;

export const ListCount = (min: number, data: Types.Directory[] | Types.Location[]) => {
  if (!data.length) {
    return null;
  }
  return (
    <ListCountStyle>
      <ListItemText>
        Showing {Math.min(min, data.length)} of {data.length}
      </ListItemText>
    </ListCountStyle>
  );
};

export const ListErrorMessage = (
  defaultError: string,
  error: Error & { response?: { data: string } }
) => (
  <ListItemContent compact>
    <ListItemText>{getErrorMessage(defaultError, error)}</ListItemText>
  </ListItemContent>
);

export default {
  ListCount,
  ListErrorMessage,
};
