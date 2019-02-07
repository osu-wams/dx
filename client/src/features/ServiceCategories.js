import React from 'react';
import styled from 'styled-components';
import { faCookieBite, faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import Icon from '../ui/Icon';
import { Color } from '../theme';

// Temporary while the API that feeds this data is ready
const categories = [
  {
    attributes: {
      categories: [
        {
          name: 'Food',
          icon: faCookieBite
        },
        {
          name: 'Health',
          icon: faCalendarAlt
        },
        {
          name: 'Safety',
          icon: faCookieBite
        },
        {
          name: 'Employment',
          icon: faCalendarAlt
        },
        {
          name: 'Experience',
          icon: faCookieBite
        },
        {
          name: 'Other category',
          icon: faCalendarAlt
        },
        {
          name: 'Food too',
          icon: faCookieBite
        },
        {
          name: 'Other category 1',
          icon: faCalendarAlt
        },
        {
          name: 'Other ',
          icon: faCalendarAlt
        }
      ]
    }
  }
];

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  @media screen and (min-width: 768px) {
    grid-gap: 2.5rem;
  }
  button {
    border-radius: 0.4rem;
    text-align: center;
    padding: 1rem;
    @media screen and (min-width: 768px) {
      padding: 2.5rem;
    }
    background: transparent;
    cursor: pointer;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.1),
      0px 3px 1px -2px rgba(0, 0, 0, 0.08);
    svg {
      display: block !important;
      margin: 0 auto 1.5rem auto;
    }
    &:hover,
    &:active,
    &:focus {
      background: ${Color['neutral-200']};
      svg {
        color: ${Color['neutral-600']};
      }
    }
  }
`;

const ServicesCategories = () => {
  const cat = categories;

  return (
    <CategoryGrid>
      {cat[0].attributes.categories.map(({ name, icon }) => {
        return (
          <button key={name}>
            <Icon icon={icon} size="2x" />
            {name}
          </button>
        );
      })}
    </CategoryGrid>
  );
};

export default ServicesCategories;
