import * as React from 'react';
import Head from 'next/head'
import { useSelector, useDispatch } from '../store/store';

import DraggableContainer from '../components/draggableContainer/DraggableContainer';

import { getSelectedPage } from '../store/designSlice';

export default function Home(props) {
  const selectedPage = useSelector(getSelectedPage);

  return (
    <>
      <Head>
        <title>I Can Design</title>
      </Head>
      {selectedPage?.components.map(componentData => {
        return <DraggableContainer componentData={componentData} />;
      })}      
    </>
  )
}

// export async function getServerSideProps() {
//   const stringToRender = require('@babel/core').transform(`<Button variant='contained'>Save</Button>`, {presets: ['@babel/preset-react']}).code;
//   return {
//     props: {
//       stringToRender
//     }
//   }
// }
