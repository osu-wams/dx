import styled from 'styled-components';
import { theme, Color } from '../../theme';
import { CardBase } from '../../ui/Card';

const CardSection = styled.div`
  & + div {
    margin-top: 1.6rem;
  }
`;

const Card = styled(CardBase)`
  padding: ${theme.spacing.unit * 2}px;
`;

const Header = styled.div`
  color: ${Color['neutral-600']};
  font-size: ${theme.fontSize[18]};
  margin-bottom: ${theme.spacing.unit * 2}px;
`;

const NoItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const NoItemsImage = styled.img`
  height: 60px;
  margin-right: 2.4rem;
`;

const NoItemsText = styled.p`
  color: ${Color["neutral-550"]};
  a {
    color: ${Color['orange-400']};
    text-decoration: none;
    font-weight: 600;
    &:hover, &:active, &:focus {
      text-decoration: underline;
    }
  }
`;

const SectionHeader = styled.div`
  color: ${Color['neutral-550']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.unit}px;
`;

export {Header, Card, CardSection, NoItems, NoItemsImage, NoItemsText, SectionHeader};
