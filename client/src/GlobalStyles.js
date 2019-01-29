import { createGlobalStyle } from 'styled-components';
import { colors, theme } from './theme';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'Open Sans', sans-serif;
    *, *:before, *:after {
      box-sizing: inherit;
    }
  }
  body {
    padding: 0;
    margin: 0;
    font-size: ${props => theme.fontSize.normal};
    line-height: 1.8;
    color: ${props => theme.colors.charcoal};
  }
  body:not(.user-is-tabbing) button:focus,
  body:not(.user-is-tabbing) input:focus,
  body:not(.user-is-tabbing) select:focus,
  body:not(.user-is-tabbing) textarea:focus {
    outline: none;
  }
  #root {
    background-color: ${colors['neutral-100']};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  input, select, textarea, button {
    font-size: inherit;
  }
  a {
    color: ${colors['stratum-400']};
  }
`;

export default GlobalStyle;
