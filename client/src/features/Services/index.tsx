import React, { useState, useEffect, FC } from 'react';
import { createClient, Entry } from 'contentful';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { colors, shadows } from '../../theme';
import { titleCase } from '../../util/helpers';
import Icon from '../../ui/Icon';
import Card from '../../ui/Card';

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 30px;
  margin-right: 40px;
`;

type CategoryItemProps = {
  active?: boolean;
};

const CategoryItem = styled.button<CategoryItemProps>`
  box-sizing: border-box;
  background: none;
  border: none;
  padding: 4px 8px;
  margin-bottom: ${props => props.theme.spacing.unit}px;
  color: ${colors['neutral-600']};
  cursor: pointer;
  &:focus:not(:focus-visible) {
    outline: 0;
  }
  border-left: 3px solid transparent;
  ${props =>
    props.active &&
    `
    border-left: 3px solid ${colors['orange-400']};
    font-weight: bold;
  `}
`;

const PartialDivider = styled.div`
  border-bottom: 1px solid ${colors['neutral-400']};
  flex: 1;
`;

const ToolsAndServicesText = styled.span`
  font-size: 24px;
  color: ${colors['neutral-600']};
  margin: 0 16px;
`;

const ToolsAndServicesHeader = () => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <PartialDivider />
    <ToolsAndServicesText>Tools &amp; Services</ToolsAndServicesText>
    <PartialDivider />
  </div>
);

const SearchWrapper = styled.div`
  border-radius: 8px;
  height: 50px;
  border: 1px solid ${colors['neutral-300']};
  /* padding: 8px 16px; */
  font-size: 18px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: none;
  padding: 8px 16px 8px 42px;
  color: ${colors['neutral-500']};
  font-size: 18px;
`;

const Search: FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <SearchWrapper>
      <div
        style={{
          position: 'absolute',
          marginTop: '8px',
          marginLeft: '16px',
          color: colors['neutral-500'],
          pointerEvents: 'none'
        }}
      >
        <Icon icon={faSearch} style={{ marginRight: '8px' }} />
        <span style={{ display: isFocused || value ? 'none' : 'inline' }}>
          Search for tools or services
        </span>
      </div>
      <SearchInput
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(!isFocused)}
        onBlur={() => setIsFocused(!isFocused)}
      />
    </SearchWrapper>
  );
};

const ServiceCardList = ({ services, selectedCategory }) => {
  if (!services) {
    return null;
  }

  let selectedServices =
    selectedCategory === 'All'
      ? services
      : services.filter(e => e.fields.categories.find(e => e.fields.title === selectedCategory));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {selectedServices.map(service => (
        <Card style={{ minWidth: '240px', flex: 1 }} key={service.sys.id}>{service.fields.name}</Card>
      ))}
    </div>
  );
};

const client = createClient({
  space: 't36t8bar6hrf',
  accessToken: '06cc69a6c4470c98db677b6b64a84c6f31d9d56fd416e458333f6daf43d1503e'
});

const Services: FC = () => {
  const [services, setServices] = useState<Entry<any>[]>([]);
  const [categories, setCategories] = useState<Entry<any>[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Get service categories
    client
      .getEntries({ content_type: 'serviceCategory' })
      .then(entries => setCategories(entries.items))
      .catch(err => console.log(err));

    // Get services
    client
      .getEntries({ content_type: 'service' })
      .then(entries => {
        console.log(entries);
        setServices(entries.items);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ToolsAndServicesHeader />
      <div style={{ display: 'flex' }}>
        <CategoryList>
          <CategoryItem
            onClick={() => setSelectedCategory('All')}
            active={selectedCategory === 'All'}
          >
            All
          </CategoryItem>
          {categories.map(({ fields, sys }) => (
            <CategoryItem
              key={sys.id}
              onClick={() => setSelectedCategory(fields.title)}
              active={selectedCategory === fields.title}
            >
              {titleCase(fields.title)}
            </CategoryItem>
          ))}
        </CategoryList>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Search />
          <ServiceCardList services={services} selectedCategory={selectedCategory} />
        </div>
      </div>
    </>
  );
};

export default Services;
