import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/macro';
import { borderRadius, fontSize, spacing } from '@osu-wams/theme';
import MyDialog from 'src/ui/MyDialog';
import Button, { CloseButton } from 'src/ui/Button';
import { FilterByType } from './Filters';
import { State } from '@osu-wams/hooks';
import { useRecoilState } from 'recoil';
import { Event } from 'src/util/gaTracking';

const MobileMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const MobileMenuClose = styled(CloseButton)`
  float: none;
  padding: 0;
`;

const MobileMenuTitle = styled.h2`
  flex-grow: 2;
  font-size: ${fontSize['24']};
`;

const MobileMenuContent = styled.div`
  font-size: ${fontSize['14']};
  padding-bottom: 50px;
`;

const ApplyFilterStyle = styled.div`
  position: fixed;
  bottom: ${spacing.default};
  left: 0;
  text-align: center;
  width: 100%;
  > button {
    width: 90%;
    margin: 0 auto;
    padding: ${spacing.default};
    font-size: ${fontSize['18']};
    border-radius: ${borderRadius[8]};
  }
`;

const FiltersMobile = () => {
  const themeContext = useContext(ThemeContext);
  const [visible, setVisible] = useRecoilState(State.applicationSearchMobileFilterState);
  const title = 'Filters';
  return (
    <MyDialog
      isOpen={visible}
      onDismiss={() => setVisible(false)}
      aria-labelledby="mobile-menu-title"
    >
      <MobileMenuHeader>
        <MobileMenuTitle id="mobile-menu-title">{title}</MobileMenuTitle>
        <MobileMenuClose onClick={(e: React.MouseEvent<HTMLElement>) => setVisible(false)} />
      </MobileMenuHeader>
      <MobileMenuContent>
        <FilterByType />
        <ApplyFilterStyle
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            Event('application-search', 'Clicked apply filter');
            setVisible(false);
          }}
        >
          <Button bg={themeContext.ui.search.filter.apply.background}>Apply Filters</Button>
        </ApplyFilterStyle>
      </MobileMenuContent>
    </MyDialog>
  );
};

export { FiltersMobile };
