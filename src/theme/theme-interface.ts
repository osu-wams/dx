/**
 * ThemeInterface is in our redeclared module src/style-components.d.ts
 * The interface had to live inside there to make styled-components/macro work with the interface
 * We are keeping this file to make that connection more obvious. It's our custom theme interface.
 */
import { ThemeInterface } from 'styled-components/macro';
export interface ThemeConfiguration extends ThemeInterface {}
