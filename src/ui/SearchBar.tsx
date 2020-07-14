import React, { useContext } from 'react';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import styled, { ThemeContext } from 'styled-components/macro';
import VisuallyHidden from '@reach/visually-hidden';
import Icon from 'src/ui/Icon';
import { fontSize } from 'src/theme';
import Input from 'src/ui/Input';

const SearchWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 2rem;
    right: 1.6rem;
    font-size: ${fontSize[24]};
  }
  margin-bottom: 2rem;
`;
const FilterInput = styled(Input)`
  color: ${({ theme }) => theme.ui.search.input.color};
  background-color: ${({ theme }) => theme.ui.search.input.background};
  width: 100%;
  padding: 1.6rem;
  font-size: ${fontSize[24]};
  border-color: ${({ theme }) => theme.ui.search.input.border.color};
`;

const SearchBar = ({ id, labelText, inputValue, ...props }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <SearchWrapper>
      <Icon icon={faSearch} color={themeContext.ui.search.icon.color} />
      <VisuallyHidden>
        <label htmlFor={id}>{labelText}</label>
      </VisuallyHidden>
      <FilterInput type="text" placeholder={labelText} value={inputValue} id={id} {...props} />
    </SearchWrapper>
  );
};

export { SearchBar };
