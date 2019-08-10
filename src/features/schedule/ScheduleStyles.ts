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

const NoCoursesImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${theme.spacing.unit * 2}px;
  height: 100px;
`;

const NoCoursesText = styled.div`
  font-size: ${theme.fontSize[14]};
  text-align: center;
  padding: 0 ${theme.spacing.unit * 2}px;

  & > a {
    color: ${Color['orange-400']};
    margin-left: ${theme.spacing.unit / 2}px;
    text-decoration: none;
    font-weight: 600;
  }

  & > a:hover {
    text-decoration: underline;
  }

  & > a > svg {
    margin-left: ${theme.spacing.unit}px;
  }
`;

const SectionHeader = styled.div`
  color: ${Color['neutral-550']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.unit}px;
`;

export {Header, Card, CardSection, NoCoursesImage, NoCoursesText, SectionHeader};
