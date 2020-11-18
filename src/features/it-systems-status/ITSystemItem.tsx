import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import {
  IconDefinition,
  faCheckCircle,
  faTachometerAlt,
  faQuestionCircle,
} from '@fortawesome/pro-light-svg-icons';
import { ListItem } from 'src/ui/List';
import { fontSize, spacing, ThemeConfiguration } from 'src/theme';
import Icon from 'src/ui/Icon';
import { ICachetComponent } from '@osu-wams/hooks/dist/api/status';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const Name = styled.div`
  color: ${({ theme }) => theme.features.itStatus.item.name.color};
`;

const Status = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.features.itStatus.item.status.color};
`;

const FlexListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  padding: ${spacing.medium} ${spacing.default};
`;

const getIconProps = (
  component: ICachetComponent,
  fontSize,
  themeContext: ThemeConfiguration
): { icon: IconDefinition; color: string; fontSize: string } => {
  const props = {
    fontSize: fontSize[24],
  };
  switch (component.status) {
    case 1:
      return {
        ...props,
        icon: faCheckCircle,
        color: themeContext.features.itStatus.item.icon.operational,
      };
    case 2:
      return {
        ...props,
        icon: faTachometerAlt,
        color: themeContext.features.itStatus.item.icon.performanceIssues,
      };
    case 3:
      return {
        ...props,
        icon: faCheckCircle,
        color: themeContext.features.itStatus.item.icon.partialOutage,
      };
    case 4:
      return {
        ...props,
        icon: faCheckCircle,
        color: themeContext.features.itStatus.item.icon.majorOutage,
      };
    default:
      return {
        ...props,
        icon: faQuestionCircle,
        color: themeContext.features.itStatus.item.icon.unknown,
      };
  }
};

const ITSystemItem: React.FC<{ component: ICachetComponent }> = ({ component }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <FlexListItem spaced>
      <Icon {...getIconProps(component, fontSize, themeContext)} />
      <Container>
        <Name>{component.name}</Name>
        <Status>{component.statusText}</Status>
      </Container>
    </FlexListItem>
  );
};

export { ITSystemItem };
