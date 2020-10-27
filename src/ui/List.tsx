import React from 'react';
import styled from 'styled-components/macro';
import { css } from 'styled-components';
import { spacing, fontSize, borderRadius } from 'src/theme';

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
    margin-bottom: ${(props) => (props.spaced ? 0 : spacing.default)};
  }
  & > button {
    /* cursor only on buttons, not divs */
    cursor: pointer;
  }
`;

const ListItemText = styled.div`
  padding-right: ${spacing.default};
  flex: 2;
  text-align: left;
`;

const ListItemHeader = styled.h4`
  color: ${({ theme }) => theme.ui.list.item.header.color};
  margin: 0;
  font-weight: normal;
`;

const ListItemContentLinkName = styled.div`
  font-size: ${fontSize[18]};
  color: ${({ theme }) => theme.ui.list.item.link.color};
  padding-left: ${spacing.default};
`;

const ListItemContent = styled.div<SpacedList>`
  width: 100%;
  background: ${({ theme }) => theme.ui.list.item.background};
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${borderRadius[8]};
  transition: all 150ms ease-in-out 0s;
  padding: ${(props) => (props.spaced ? spacing.default : spacing.xm)};
  svg,
  img {
    height: 3rem;
    font-size: 2.4rem;
    width: 3rem !important; /* overwrite fontawsome class to have equal spacing of icons */
    & + ${ListItemText} {
      padding-left: 1.5rem;
    }
  }
  text-decoration: none;
`;

const ListItemContentLink = styled(ListItemContent).attrs({ as: 'a' })<TLink>`
  color: ${({ theme }) => theme.ui.list.item.link.color};
  &:hover {
    ${ListItemHeader},
    ${ListItemContentLinkName} {
      color: ${({ theme }) => theme.ui.list.item.link.hoverColor};
    }
    border: 1px solid ${({ theme }) => theme.ui.list.item.border};
  }
`;

const ListItemContentLinkSVG = styled(ListItemContentLink)`
  &:hover {
    & > svg {
      color: ${({ theme }) => theme.ui.list.item.link.hoverColor};
    }
  }
`;

const ListItemFlex = styled(ListItem).attrs((props: { hoverable?: boolean }) => ({
  hoverable: props.hoverable ?? true,
}))`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  /* Material UI checkbox style update */
  .MuiCheckbox-root {
    width: 48px;
    height: 48px;
    font-size: ${fontSize[18]};
    margin-right: 5px;
  }
  ${ListItemText} {
    padding-right: 0;
  }
  ${(props) =>
    props.hoverable &&
    css`
      &:hover {
        ${ListItemHeader},
        ${ListItemContent} {
          color: ${({ theme }) => theme.ui.list.item.link.hoverColor};
        }
        box-shadow: ${({ theme }) => theme.ui.list.item.link.boxShadow};
        transform: translateY(-1px);
        border-color: ${({ theme }) => theme.ui.list.item.border};
      }
    `}
`;

type TLink = React.HTMLProps<HTMLAnchorElement>;

const ListItemResourceLink = styled(ListItemContent).attrs({ as: 'a' })<TLink>`
  &:hover,
  &:active,
  &:focus {
    ${ListItemContentLinkName},
    & > svg {
      color: ${({ theme }) => theme.ui.list.item.link.hoverColor};
    }
  }
`;

const ListItemContentButton = styled(ListItemContentLink).attrs({ as: 'button' })``;

const ListItemDescription = styled.div<{ fontSize?: string; color?: string }>`
  color: ${({ color, theme }) => (color ? color : theme.ui.list.item.description.color)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : fontSize[14])};
  line-height: 1.6rem;
`;

const ListItemLeadText = styled.div`
  line-height: ${fontSize[14]};
  text-align: center;
  padding: 0 ${spacing.default} 0 0;
  color: ${({ theme }) => theme.ui.list.item.leadText.color};
  width: ${fontSize[58]};
  strong {
    line-height: ${fontSize[20]};
    font-size: ${fontSize[20]};
  }
`;

export {
  List,
  ListItem,
  ListItemFlex,
  ListItemContent,
  ListItemContentButton,
  ListItemContentLink,
  ListItemContentLinkName,
  ListItemContentLinkSVG,
  ListItemResourceLink,
  ListItemText,
  ListItemHeader,
  ListItemDescription,
  ListItemLeadText,
};
