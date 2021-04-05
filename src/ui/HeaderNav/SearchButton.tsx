import React from 'react';
import { Menu } from '@reach/menu-button';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import VisuallyHidden from '@reach/visually-hidden';
import { HeaderNavButton } from './HeaderNavStyles';
import { Event } from 'src/util/gaTracking';
import Icon from 'src/ui/Icon';
import { useNavigate } from '@reach/router';
import { Routes } from 'src/routers';

const SearchButton = () => {
  const navigate = useNavigate();
  return (
    <Menu>
      <HeaderNavButton
        onClick={() => {
          Event('header', 'search-button', 'Search button clicked');
          navigate(Routes().search.fullPath);
        }}
      >
        <Icon icon={faSearch} size="lg" />
        <VisuallyHidden>Search</VisuallyHidden>
      </HeaderNavButton>
    </Menu>
  );
};

export { SearchButton };
