import React, { useState, FC } from 'react';
import nanoid from 'nanoid';
import { useMediaQuery } from 'react-responsive';
import { CardBase } from './StyledCardComponents';
import { breakpoints } from 'src/theme';

const CardContext = React.createContext<any>(null);

const Card: FC<{ collapsing?: boolean }> = ({ children, collapsing = true, ...props }) => {
  // Generate a unique id for linking header to controlled content
  const uuid = nanoid();
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const isMobile = !useMediaQuery({ minWidth: breakpoints.small });
  const collapsible = isMobile && collapsing;
  const value = { collapsed, toggleCollapsed, collapsible, uuid };

  return (
    <CardBase css={{ padding: 0 }} {...props}>
      <CardContext.Provider value={value}>{children}</CardContext.Provider>
    </CardBase>
  );
};

export { Card, CardContext };
