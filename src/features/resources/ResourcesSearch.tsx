import React, { useEffect } from 'react';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components/macro';
import Icon from 'src/ui/Icon';
import { spacing, borderRadius } from 'src/theme';
import { Event } from 'src/util/gaTracking';

const ResourcesSearch: React.FC<any> = ({ query, setQuery, setSelectedCategory }) => {
  useEffect(() => {
    if (query !== '') {
      Event('resource-search', query);
    }
  }, [query]);

  const handleChange = (value) => {
    setQuery(value);
    setSelectedCategory('all');
  };
  return (
    <SearchWrapper>
      <InputLabel htmlFor="resourcesSearch" aria-label="Find resources">
        <Icon icon={faSearch} />
      </InputLabel>
      <Input
        placeholder="Find resources"
        value={query}
        id="resourcesSearch"
        onChange={(e) => handleChange(e.target.value)}
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  border-radius: ${borderRadius[8]};
  margin-bottom: ${spacing.medium};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.features.resources.search.border};
`;

const Input = styled.input`
  background: ${({ theme }) => theme.features.resources.search.input.background};
  border: none;
  box-sizing: border-box;
  height: 48px;
  padding: ${spacing.medium} ${spacing.default};
  padding-left: 4.6rem;
  min-width: 0;
  flex: 1;
`;

const InputLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 16px;
  pointer-events: none;
`;

export default ResourcesSearch;
