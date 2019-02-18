import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { faSearch, faTimes } from '@fortawesome/pro-light-svg-icons';
import { CardBase } from '../../ui/Card';
import InputBase from '../../ui/Input';
import { theme, Color } from '../../theme';
import Icon from '../../ui/Icon';
import { getFeaturedServices, getServices } from '../../api/services';
import { Entry } from 'contentful';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemText,
  ListItemHeader,
  ListItemDescription
} from '../../ui/List';
import useDebounce from '../../util/useDebounce';

const ServiceSearch = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [services, setServices] = useState<Entry<any>[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    if (!showDialog) {
      setShowDialog(true);
    }
  };

  const closeDialog = () => {
    if (showDialog) {
      setQuery('');
      setShowDialog(false);
    }
  };

  useEffect(() => {
    getFeaturedServices()
      .then(setServices)
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      getServices()
      .then(items => setServices(items))
      .catch(console.log);
    }
  }, [debouncedQuery]);

  const handleChange = e => setQuery(e.target.value);

  return (
    <>
      <Card showDialog={showDialog}>
        <SearchPlaceholder showDialog={showDialog}>
          <IconButton onClick={closeDialog}>
            <Icon icon={showDialog ? faTimes : faSearch} color={Color["neutral-400"]} />
          </IconButton>
          <span>Find tools and services</span>
        </SearchPlaceholder>
        <Input value={query} onChange={handleChange} onFocus={openDialog} />
        {showDialog && <InputActiveHighlight />}
        {(query || (services && showDialog)) && (
          <CardContent>
            <List>
              {services.map(service => (
                <ListItem>
                  <ListItemContent>
                    <ListItemText>
                      <ListItemHeader>{service.fields.name}</ListItemHeader>
                      <ListItemDescription>{service.fields.description}</ListItemDescription>
                    </ListItemText>
                  </ListItemContent>
                </ListItem>
              ))}
            </List>
          </CardContent>
        )}
      </Card>
      {showDialog && (
        <>
          <CardPlaceHolder />
          <Overlay onClick={closeDialog} />
        </>
      )}
    </>
  );
};

const Card = styled(CardBase)<{ showDialog: boolean }>`
  min-height: 48px;
  display: block;
  ${props =>
    props.showDialog &&
    `
    position: fixed;
    top: 16px;
    right: 16px;
    left: 16px;
    z-index: 1000;
  `}
`;

const CardContent = styled.div`
  padding: ${theme.spacing.unit * 3}px;
  padding-top: 0;
`;

const CardPlaceHolder = styled(CardBase)`
  height: 48px;
  background: none;
  box-shadow: none;
`;

const Input = styled(InputBase)`
  height: 48px;
  width: 100%;
  font-size: ${theme.fontSize[18]};
  padding: ${theme.spacing.unit}px ${theme.spacing.unit * 8}px;
  border: none;
`;

const InputActiveHighlight = styled.div`
  position: absolute;
  width: 80%;
  height: 3px;
  background: ${Color["orange-400"]};
  top: ${theme.spacing.unit * 6}px;
  left: ${theme.spacing.unit * 7}px;
`;

const IconButton = styled.button`
  height: ${theme.spacing.unit * 4}px;
  width: ${theme.spacing.unit * 4}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  z-index: 1000;
  pointer-events: all;
  padding: 0;
  & > svg {
    font-size: 18px;
  }
`;

const SearchPlaceholder = styled.div<{ showDialog?: boolean }>`
  pointer-events: none;
  position: absolute;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: ${theme.spacing.unit * 3}px;
  font-size: 18px;
  & > span {
    margin-left: ${theme.spacing.unit}px;
    display: ${props => (props.showDialog ? 'none' : 'inline')};
    color: ${Color['neutral-400']};
  }
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.33);
`;

export default ServiceSearch;
