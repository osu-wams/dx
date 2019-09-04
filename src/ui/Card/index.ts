import React from 'react';
import Card from './Card';
import CardIcon from './CardIcon';
import CardFooter from './CardFooter';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import {
  CardBase,
  Badge,
  CardContentCell,
  CardContentRow,
  CardContentTable
} from './StyledCardComponents';

const CardContext = React.createContext<any>(null);

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  CardIcon,
  CardBase,
  CardContentTable,
  CardContentRow,
  CardContentCell,
  CardContext
};
