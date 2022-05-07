import * as React from 'react';
import Head from 'next/head'

import DraggableContainer from '../components/draggableContainer/DraggableContainer';

export default function Home(props) {
  const { stringToRender } = props;

  return (
    <>
      <Head>
        <title>I Can Design</title>
      </Head>
      <DraggableContainer stringToRender={stringToRender} />
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
