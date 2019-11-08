import { createMuiTheme } from '@material-ui/core/styles';
import { Color } from '../theme';

const MUITheme = createMuiTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    htmlFontSize: 10
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: Color['orange-400']
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: Color['orange-400']
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
  }
});

export default MUITheme;
