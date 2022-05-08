import { Provider as ReduxProvider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import store from '../store/store';

const theme = createTheme({
  palette: {
    background: {
      default: "lightgrey"
    },
    primary: {
      main: '#000'
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default MyApp
