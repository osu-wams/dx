import React from 'react';
import styled from 'styled-components/macro';
import { Menu, MenuLink, MenuPopover } from '@reach/menu-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { HeaderNavButton, HeaderNavText, HeaderNavList } from 'src/ui/HeaderNav/HeaderNavStyles';
import { Event } from 'src/util/gaTracking';
import { HighlightTitle } from 'src/ui/Highlights';
import { fontSize, spacing } from 'src/theme';
import { Types } from '@osu-wams/lib';

const HeaderNavTitle = styled(HighlightTitle)`
  padding: 0 ${spacing.default} 0 0;
  margin-left: -${spacing.medium};
`;

const StudentGpaMenu = ({ selectedGpa, gpaLevels, setSelectedGpa }) => {
  // TODO: Follow up with stakeholders on terminology for the select list, title
  const levelTitle = (gpaLevel: Types.GpaLevel) => `${gpaLevel.level} - ${gpaLevel.gpaType}`;
  return (
    <Menu>
      <HeaderNavButton
        onClick={() => Event('academic-overview', 'gpa-button-menu', 'GPA button menu expanded')}
      >
        <HeaderNavTitle as="span">{levelTitle(selectedGpa)}</HeaderNavTitle>
        <FontAwesomeIcon icon={faChevronDown} size="sm" />
      </HeaderNavButton>
      <MenuPopover>
        <HeaderNavList>
          {gpaLevels &&
            gpaLevels.length > 0 &&
            gpaLevels.map((gpaLevel, index) => (
              <MenuLink
                key={`${gpaLevel.level}-${index}`}
                onClick={() => {
                  Event('academic-overview', 'gpa-button-menu', 'GPA item clicked');
                  setSelectedGpa(gpaLevel);
                }}
              >
                {levelTitle(gpaLevel)}
              </MenuLink>
            ))}
        </HeaderNavList>
      </MenuPopover>
    </Menu>
  );
};

export { StudentGpaMenu };
