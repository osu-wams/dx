import styled from 'styled-components/macro';
import { fontSize, spacing } from 'src/theme';
import { CardBase } from 'src/ui/Card';

const CardSection = styled.div`
  & + div {
    margin-top: 1.6rem;
  }
`;

const Card = styled(CardBase)`
  padding: ${spacing.default};
`;

const Header = styled.div`
  color: ${({ theme }) => theme.features.academics.courses.header.color};
  font-size: ${fontSize[18]};
  margin-bottom: ${spacing.default};
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
  color: ${({ theme }) => theme.features.academics.courses.emptyList.text.color};
  a {
    color: ${({ theme }) => theme.features.academics.courses.emptyList.link.color};
    text-decoration: none;
    font-weight: 600;
    &:hover,
    &:active,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const SectionHeader = styled.h3`
  color: ${({ theme }) => theme.features.academics.courses.sectionHeader.color};
  font-weight: 600;
  font-size: ${fontSize[16]};
  margin-bottom: ${spacing.medium};
  margin-top: 0;
`;

export { Header, Card, CardSection, NoItems, NoItemsImage, NoItemsText, SectionHeader };
