import { shadows, gradients, breakpoints, themeSettings } from './theme-settings';
import { Color } from './theme-colors';
import { ThemeContext, ThemeConfiguration as TC, styled } from './theme-interface';
import GlobalStyles from './GlobalStyles';
export {
  shadows,
  gradients,
  breakpoints,
  GlobalStyles,
  themeSettings,
  Color,
  ThemeContext,
  styled
};

export type ThemeConfiguration = TC;
