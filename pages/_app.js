import { Provider as ReduxProvider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import store from '../store/store';

import Leftbar from '../components/designToolLayout/Leftbar';
import Rightbar from '../components/designToolLayout/Rightbar';
import Pane from '../components/designToolLayout/Pane'

const theme = createTheme({
  palette: {
    background: {
      default: "lightgrey"
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Leftbar />
        <Rightbar />
        <Pane>
          <Component {...pageProps} />
        </Pane>
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default MyApp
