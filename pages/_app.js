import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Leftbar from '../components/layout/Leftbar';
import Rightbar from '../components/layout/Rightbar';

const theme = createTheme({
  palette: {
    background: {
      default: "lightgrey"
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Leftbar />
      <Rightbar />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
