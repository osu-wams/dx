import { createGlobalStyle } from 'styled-components';
import { Color, theme } from './theme';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Stratum2;
    src: url('./assets/Stratum2WebRegular.woff2');
    font-weight: 400;
  }
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
    font-size: ${theme.fontSize[16]};
    line-height: 1.5;
    color: ${Color['neutral-700']};
  }
  body:not(.user-is-tabbing) button:focus,
  body:not(.user-is-tabbing) input:focus,
  body:not(.user-is-tabbing) select:focus,
  body:not(.user-is-tabbing) textarea:focus {
    outline: none;
  }
  #root {
    background-color: ${Color['neutral-100']};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  input, select, textarea, button {
    font-size: inherit;
  }
  a {
    color: ${Color['stratosphere-400']};
  }
  strong {
    font-weight: 600;
  }
`;

export default GlobalStyle;
