import React, { useEffect } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import Icon from '../../ui/Icon';
import { Color, theme } from '../../theme';
import { Event } from '../../util/gaTracking';

const ResourcesSearch: React.FC<any> = ({ query, setQuery, setSelectedCategory }) => {
  useEffect(() => {
    Event('resource-search', query);
  }, [query]);

  const handleChange = value => {
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
        onChange={e => handleChange(e.target.value)}
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  border-radius: ${theme.borderRadius};
  margin-bottom: ${theme.spacing.unit}px;
  overflow: hidden;
  border: 1px solid ${Color['neutral-200']};
`;

const Input = styled.input`
  background: #ffffff;
  border: none;
  box-sizing: border-box;
  height: 48px;
  padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
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
