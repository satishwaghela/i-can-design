import * as React from 'react';
import Head from 'next/head'
import { Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DraggableContainer from '../components/DraggableContainer';

const theme = createTheme({});

export default function Home(props) {
  const { stringToRender } = props;

  return (
    <>
      <Head>
        <title>I Can Design</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DraggableContainer stringToRender={stringToRender} />
      </ThemeProvider>
    </>
  )
}

export async function getServerSideProps() {
  const stringToRender = require('@babel/core').transform(`<Button variant='contained'>Save</Button>`, {presets: ['@babel/preset-react']}).code;
  return {
    props: {
      stringToRender
    }
  }
}
