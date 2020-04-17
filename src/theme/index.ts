import {
  shadows,
  gradients,
  breakpoints,
  spacing,
  fontSize,
  borderRadius,
  mq,
} from './theme-settings';
import { Color } from './theme-colors';
import type { ThemeConfiguration } from './theme-interface';
import GlobalStyles from './GlobalStyles';
import { MainGridWrapper, MainGrid, SecondGridWrapper } from './grid/PageGrid';
import { Masonry } from './grid/Masonry';

export {
  shadows,
  spacing,
  gradients,
  breakpoints,
  mq,
  GlobalStyles,
  fontSize,
  borderRadius,
  Color,
  MainGridWrapper,
  MainGrid,
  SecondGridWrapper,
  Masonry,
};

export type { ThemeConfiguration };
