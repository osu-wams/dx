import React, { useState } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { Dialog as ReachDialog } from '@reach/dialog';
import { theme, Color } from '../../theme';
import Icon from '../../ui/Icon';
import CloseButton from '../../ui/Button/CloseButton';
import {
  List,
  ListItemContent,
  ListItemText,
  ListItemHeader,
  ListItemDescription,
  ListItem
} from '../../ui/List';

const placeholderServices = [
  {
    name: 'Register for courses',
    url: '#',
    shortDescription: 'Add, drop and change grading modes'
  },
  {
    name: 'Register for courses',
    url: '#',
    shortDescription: 'Add, drop and change grading modes'
  },
  {
    name: 'Register for courses',
    url: '#',
    shortDescription: 'Add, drop and change grading modes'
  },
  {
    name: 'Register for courses',
    url: '#',
    shortDescription: 'Add, drop and change grading modes'
  }
];

const ServiceSearchButton = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [services, setServices] = useState(placeholderServices);

  return (
    <>
      <IconButton onClick={() => setShowSearch(true)}>
        <Icon icon={faSearch} color={Color['neutral-700']} />
      </IconButton>
      <Dialog isOpen={showSearch}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Icon icon={faSearch} style={{ fontSize: '24px' }} />
          <SearchInput placeholder="Find tools and services" />
          <CloseButton onClick={() => setShowSearch(false)} />
        </div>
        {services.length && (
          <List>
            {services.map(service => (
              <ListItem>
                <ListItemContent>
                  <ListItemText>
                    <ListItemHeader>{service.name}</ListItemHeader>
                    <ListItemDescription>{service.shortDescription}</ListItemDescription>
                  </ListItemText>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        )}
      </Dialog>
    </>
  );
};

const Dialog = styled(ReachDialog)`
  &[data-reach-dialog-content] {
    margin: 0;
    height: 100vh;
    width: 100vw;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  margin-right: ${theme.spacing.unit}px;
  & > svg {
    color: ${Color['neutral-500']};
  }
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: 2px solid ${Color['neutral-500']};
  &:focus {
    border-bottom: 2px solid ${Color['orange-400']};
  }
  padding: 6px 8px;
  flex: 1;
  margin-left: 16px; 
`;

export default ServiceSearchButton;
