import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#141414',
      light: '#504f4f',
    },
    secondary: {
      main: '#585858',
    },
    text: {
      primary: 'rgba(61,61,61,0.87)',
    },
  },
});

export default theme;
