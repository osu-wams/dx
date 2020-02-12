import { shadows, gradients, breakpoints, themeSettings } from './theme-settings';
import { Color } from './theme-colors';
import { ThemeContext, ThemeConfiguration as TC, styled } from './theme-interface';
import GlobalStyles from './GlobalStyles';
import { MainGridWrapper, MainGrid, SecondGridWrapper } from './grid/PageGrid';
import { Masonry } from './grid/Masonry';

export {
  shadows,
  gradients,
  breakpoints,
  GlobalStyles,
  themeSettings,
  Color,
  ThemeContext,
  styled,
  MainGridWrapper,
  MainGrid,
  SecondGridWrapper,
  Masonry
};

export type ThemeConfiguration = TC;
