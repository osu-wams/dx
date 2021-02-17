import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { fontSize } from 'src/theme';
import MyDialog from 'src/ui/MyDialog';
import { CloseButton } from 'src/ui/Button';
import { FilterByType } from './Filters';
import { applicationSearchMobileFilterState } from 'src/state/applicationSearch';
import { useRecoilState } from 'recoil';

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
`;

const FiltersMobile = () => {
  const [visible, setVisible] = useRecoilState(applicationSearchMobileFilterState);
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
      </MobileMenuContent>
    </MyDialog>
  );
};

export { FiltersMobile };
