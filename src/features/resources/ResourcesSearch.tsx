import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { useDebounce } from 'use-debounce';
import Icon from '../../ui/Icon';
import { Color, theme } from '../../theme';
import { getResources } from '../../api/resources';

const ResourcesSearch: React.FC<any> = ({ setResources, setSelectedCategory, setSearchTerm }) => {
  const [query, setQuery] = useState<string>('');
  const [debouncedText] = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedText) {
      setSelectedCategory('all');
      getResources(debouncedText)
        .then(res => setResources(res))
        .catch(console.log);
    } else {
      getResources('')
        .then(res => setResources(res))
        .catch(console.log);
    }
  }, [debouncedText, setResources, setSelectedCategory, query]);

  return (
    <SearchWrapper>
      <InputLabel>
        <Icon icon={faSearch} />
      </InputLabel>
      <Input
        placeholder="Find resources"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setSearchTerm(e.target.value);
        }}
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
