import React, { FC, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PageTitle from '../ui/PageTitle';
import ServicesCategories from '../features/services/ServiceCategories';
import { useEffect } from 'react';
import {
  Menu,
  MenuList as ReachMenuList,
  MenuButton as ReachMenuButton,
  MenuItem
} from '@reach/menu-button';
import Icon from '../ui/Icon';
import { faChevronDown, faSearch } from '@fortawesome/pro-light-svg-icons';
import { Color, theme, shadows } from '../theme';
import useMediaQuery from '../util/useMediaQuery';
import { CardBase } from '../ui/Card';
import osuIcon from '../assets/logo.png';

const getServices = (query) => axios.get('/api/services').then(res => res.data);
const getServicesByCategory = categoryId =>
  axios.get(`/api/services?category=${categoryId}`).then(res => res.data);
const getCategories = () => axios.get('/api/services/categories').then(res => res.data);

const Tools = () => {
  const isMounted = useRef(true);
  const [services, setServices] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);

  // Load category data on initial render
  useEffect(() => {
    getCategories()
      .then(data => {
        const defaultCategory = data[0].id;
        setSelectedCategory(defaultCategory);
        setCategories(data);
      })
      .catch(console.log);

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Load services based on selected category
  useEffect(() => {
    if (selectedCategory) {
      getServicesByCategory(selectedCategory)
        .then(res => {
          setServices(res.data);
        })
        .catch(console.log);
    }
  }, [selectedCategory]);

  const getCategoryById = categoryId => categories.find(e => e.id === categoryId);

  return (
    <div>
      <SearchWrapper>
        <InputLabel>
          <Icon icon={faSearch} /> {!isInputActive && !query && 'Find tools'}
        </InputLabel>
        <Input
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {categories.length > 0 && (
          <Menu>
            <MenuButton>
              {getCategoryById(selectedCategory).attributes.name}{' '}
              <MenuButtonIcon icon={faChevronDown} />
            </MenuButton>
            <MenuList>
              {categories.map(category => (
                <MenuItem key={category.id} onSelect={() => setSelectedCategory(category.id)}>
                  {category.attributes.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </SearchWrapper>
      <div>
        {services.length > 0 &&
          services.map(service => (
            <ServiceCard key={service.id}>
              <ServiceCardName>{service.attributes.title}</ServiceCardName>
              <ServiceCardDescription>
                {service.attributes.field_service_description}
              </ServiceCardDescription>
            </ServiceCard>
          ))}
      </div>
    </div>
  );
};

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  border-radius: ${theme.borderRadius};
  margin-bottom: ${theme.spacing.unit * 2}px;
  overflow: hidden;
  border: 1px solid ${Color['neutral-200']};
`;

const Input = styled.input`
  background: #ffffff;
  border: none;
  box-sizing: border-box;
  height: 48px;
  padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
  padding-left: 36px;
  min-width: 0;
  flex: 1;
`;

const InputLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 16px;
  pointer-events: none;
`;

const MenuList = styled(ReachMenuList)`
  &[data-reach-menu-list] {
    border: none;
    box-shadow: ${shadows[1]};
  }
`;

const MenuButton = styled(ReachMenuButton)`
  display: flex;
  background: white;
  border: none;
  padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
`;

const MenuButtonIcon = styled(Icon)`
  margin-left: ${theme.spacing.unit}px;
`;

const ServiceCard = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

const ServiceCardName = styled.div`
  font-size: ${theme.fontSize[18]};
  color: ${Color['neutral-600']};
`;

const ServiceCardDescription = styled.div`
  color: ${Color.black};
`;

export default Tools;
