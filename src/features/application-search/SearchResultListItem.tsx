import React from 'react';
import styled from 'styled-components/macro';
import { ListItemFlex } from 'src/ui/List';
import { SimpleInternalLink, SimpleExternalLink } from 'src/ui/Link';
import { SearchItem } from 'src/state/search';
import Fuse from 'fuse.js';
import { Bubble } from 'src/ui/Bubble';
import { borderRadius, spacing, breakpoints, fontSize } from 'src/theme';

const StyledListItem = styled(ListItemFlex)`
  border-radius: ${borderRadius[16]};
  box-shadow: ${({ theme }) => theme.ui.card.boxShadow};
  background-color: ${({ theme }) => theme.ui.card.background};
  overflow: hidden;
  margin-bottom: ${spacing.mobile};
  padding: ${spacing.medium};
  @media (min-width: ${breakpoints.small}) {
    margin-bottom: ${spacing.large};
  }
  > a {
    flex: 1;
    font-size: ${fontSize[18]};
    margin: 0;
    padding: ${spacing.medium} ${spacing.small};
    color: inherit;
  }
  > span {
    margin: ${spacing.xm} ${spacing.small};
  }
`;

const titleLink = (item: SearchItem) => {
  return item.to ? (
    <SimpleInternalLink to={item.to}>{item.title}</SimpleInternalLink>
  ) : (
    <SimpleExternalLink href={item.href}>{item.title}</SimpleExternalLink>
  );
};

const SearchResultListItem = ({
  searchResult: { item },
}: {
  searchResult: Fuse.FuseResult<SearchItem>;
}) => {
  return (
    <StyledListItem>
      {titleLink(item)}
      <Bubble>{item.type}</Bubble>
    </StyledListItem>
  );
};

export default SearchResultListItem;
