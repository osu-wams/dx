import React from 'react';
import styled from 'styled-components';
import { theme } from '../theme';

type SpacedList = {
  spaced?: boolean;
};

const List = styled.ul`
  color: ${({ theme }) => theme.ui.list.color};
  text-decoration: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li<SpacedList>`
  list-style-type: none;
  &:last-child {
    margin-bottom: ${props => (props.spaced ? 0 : theme.spacing.unit * 2)}px;
  }
  & > button {
    /* cursor only on buttons, not divs */
    cursor: pointer;
  }
`;

const ListItemContent = styled.div<SpacedList>`
  width: 100%;
  background: ${({ theme }) => theme.ui.list.item.background};
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  border: none;
  border-radius: 8px;
  transition: all 150ms ease-in-out 0s;
  padding: ${props => (props.spaced ? theme.spacing.unit * 2 : 12)}px
    ${props => (props.spaced ? theme.spacing.unit * 2 : 12)}px;
  svg,
  img {
    height: 3rem;
    font-size: 2.4rem;
    width: 3rem !important; /* overwrite fontawsome class to have equal spacing of icons */
    & + div {
      padding-left: 1.5rem;
    }
  }
  text-decoration: none;
`;

type TLink = React.HTMLProps<HTMLAnchorElement>;

const ListItemContentLink = styled(ListItemContent).attrs({ as: 'a' })<TLink>`
  &:hover {
    & > div {
      color: ${({ theme }) => theme.ui.list.item.link.color};
    }
    box-shadow: ${({ theme }) => theme.ui.list.item.link.boxShadow};
    transform: translateY(-4px);
  }
`;

const ListItemContentButton = styled(ListItemContentLink).attrs({ as: 'button' })``;

const ListItemText = styled.div`
  padding-right: 1.5rem;
  flex: 2;
  text-align: left;
`;

const ListItemHeader = styled.h4`
  color: ${({ theme }) => theme.ui.list.item.header.color};
  margin: 0;
  font-weight: normal;
`;

const ListItemDescription = styled.div<{ fontSize?: string; color?: string }>`
  color: ${({ color, theme }) => (color ? color : theme.ui.list.item.description.color)};
  font-size: ${props => (props.fontSize ? props.fontSize : theme.fontSize[14])};
  line-height: 1.6rem;
`;

const ListItemLeadText = styled.div`
  line-height: ${theme.fontSize[14]};
  text-align: center;
  padding: 0 ${theme.spacing.unit * 2}px 0 0;
  color: ${({ theme }) => theme.ui.list.item.leadText.color};
  width: ${theme.fontSize[58]};
  strong {
    line-height: ${theme.fontSize[20]};
    font-size: ${theme.fontSize[20]};
  }
`;

export {
  List,
  ListItem,
  ListItemContent,
  ListItemContentButton,
  ListItemContentLink,
  ListItemText,
  ListItemHeader,
  ListItemDescription,
  ListItemLeadText
};
