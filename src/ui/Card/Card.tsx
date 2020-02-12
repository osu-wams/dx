import React, { useState, FC } from 'react';
import uuidv4 from 'uuid/v4';
import useMediaQuery from '../../util/useMediaQuery';
import { CardBase } from './StyledCardComponents';

const CardContext = React.createContext<any>(null);

const Card: FC<{ collapsing?: boolean }> = ({ children, collapsing = true, ...props }) => {
  // Generate a UUID for linking header to controlled content
  const uuid = uuidv4();
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const isMobile = !useMediaQuery('(min-width: 768px)');
  const collapsible = isMobile && collapsing;
  const value = { collapsed, toggleCollapsed, collapsible, uuid };

  return (
    <CardBase style={{ padding: 0 }} {...props}>
      <CardContext.Provider value={value}>{children}</CardContext.Provider>
    </CardBase>
  );
};

export { Card, CardContext };
