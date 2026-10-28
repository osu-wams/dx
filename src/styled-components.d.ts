import 'styled-components';
import { MOSTheme } from '@osu-wams/theme';

declare module 'styled-components' {
  // Extends the global DefaultTheme with our theme so `props.theme` is typed everywhere.
  export interface DefaultTheme extends MOSTheme {}
}
