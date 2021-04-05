import { createGlobalStyle } from 'styled-components';
import { fontSize } from './';

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
    font-size: ${fontSize[16]};
    line-height: 1.5;
    color: ${({ theme }) => theme.body.color};
  }
  body:not(.user-is-tabbing) button:focus,
  body:not(.user-is-tabbing) input:focus,
  body:not(.user-is-tabbing) select:focus,
  body:not(.user-is-tabbing) textarea:focus {
    outline: none;
  }
  #root {
    background-color: ${({ theme }) => theme.body.background};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  input, select, textarea, button {
    font-size: inherit;
  }
  strong {
    font-weight: 600;
  }
  /* Router helper */
  .router-styles {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  [data-reach-dialog-overlay] {
    z-index: 100;
  }
  @media screen and (max-width: 767px) {
    [data-reach-dialog-overlay] {
      background: ${({ theme }) => theme.ui.myDialog.background} !important;
    }
  }
  @media screen and (min-width: 768px) {
    [data-reach-menu] {
      z-index: 10;
    }
  }
  .gsc-selected-option-container {
    /* default is 90% and causes a weird wrapping effect */
    max-width: 100% !important;
  }
`;

export default GlobalStyle;
