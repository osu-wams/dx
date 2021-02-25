import React from 'react';
import styled from 'styled-components/macro';
import { faExternalLink } from '@fortawesome/pro-solid-svg-icons';
import { ListItemFlex } from 'src/ui/List';
import { SimpleInternalLink, SimpleExternalLink } from 'src/ui/Link';
import { SearchItem } from 'src/state/search';
import Fuse from 'fuse.js';
import { BubbleExternalLink, BubbleInternalLink } from 'src/ui/Bubble';
import { borderRadius, spacing, breakpoints, fontSize } from 'src/theme';
import Icon from '../Icon';

const SearchResultStyles = styled(ListItemFlex)`
  border-radius: ${borderRadius[16]};
  box-shadow: ${({ theme }) => theme.ui.card.boxShadow};
  background-color: ${({ theme }) => theme.ui.card.background};
  overflow: hidden;
  margin-bottom: ${spacing.mobile};
  padding: ${spacing.medium};
  @media (min-width: ${breakpoints.small}) {
    margin-bottom: ${spacing.large};
  }
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.div`
  display: flex;
  > a {
    flex: 1;
    font-size: ${fontSize[18]};
    margin: 0;
    padding: ${spacing.medium} ${spacing.small} 0 ${spacing.small};
    color: ${({ theme }) => theme.ui.searchResult.title.color};
  }
  > span {
    margin: ${spacing.medium} ${spacing.small};
  }
`;

const SubText = styled.div`
  font-size: ${fontSize[14]};
  font-weight: 300;
  padding: 0 ${spacing.small};
  color: ${({ theme }) => theme.ui.searchResult.subText.color};
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
  onClick,
}: {
  searchResult: Fuse.FuseResult<SearchItem>;
  onClick?: () => void;
}) => {
  return (
    <SearchResultStyles>
      <Header>
        {titleLink(item)}
        {item.href ? (
          <BubbleExternalLink>
            {item.type}
            <Icon icon={faExternalLink} />
          </BubbleExternalLink>
        ) : (
          <BubbleInternalLink>{item.type}</BubbleInternalLink>
        )}
      </Header>
      {item.subText &&
        (item.subText.html ? (
          <SubText dangerouslySetInnerHTML={{ __html: item.subText.html ?? '' }} />
        ) : (
          <SubText>{item.subText.value ?? ''}</SubText>
        ))}
    </SearchResultStyles>
  );
};

export default SearchResultListItem;
