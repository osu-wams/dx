import styled from 'styled-components';
import { theme, Color } from '../theme';

const List = styled.ul`
  color: ${Color['neutral-700']};
  text-decoration: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
  &:not(:last-child) {
    margin-bottom: ${theme.spacing.unit * 2}px;
  }
  & > button {
    /* cursor only on buttons, not divs */
    cursor: pointer;
  }
`;

const ListItemContent = styled.div`
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  border: none;
  svg {
    font-size: 2.4rem;
    width: 3rem !important; /* overwrite fontawsome class to have equal spacing of icons */
    & + div {
      padding-left: 1.5rem;
    }
  }
  text-decoration: none;
`;

const ListItemContentButton = styled(ListItemContent).attrs({ as: 'button' })``;

const ListItemText = styled.div`
  padding-right: 1.5rem;
  flex: 2;
  text-align: left;
`;

const ListItemHeader = styled.h4`
  color: ${Color['neutral-700']};
  margin: 0;
  font-weight: normal;
`;

const ListItemDescription = styled.div`
  color: ${Color['neutral-550']};
  font-size: ${theme.fontSize[14]};
  line-height: 1.6rem;
`;

export {
  List,
  ListItem,
  ListItemContent,
  ListItemContentButton,
  ListItemText,
  ListItemHeader,
  ListItemDescription
};
