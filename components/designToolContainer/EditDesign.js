import * as React from 'react';
import { isEqual } from 'lodash';
import axios from 'axios';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head'
import { useSelector, useDispatch } from '../../store/store';

import DesignToolContainer from './DesignToolContainer';
import DraggableContainer from '../draggableContainer/DraggableContainer';

import designSlice, { getSelectedPage, getTheme, getDesignState } from '../../store/designSlice';

export default function EditDesign(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const dataRef = React.useRef(null);

  const fetchDesignData = async (id) => {
    const res = await axios.get(`/api/design/${id}`);
    if (res.data) {
      dataRef.current = res.data;
      dispatch(designSlice.actions.setData(res.data));
    }
  };

  const saveDesignState = async (id, designState) => {
    if (id !== designState.id || isEqual(dataRef.current, designState)) {
      return '';
    };
    try {
      const res = await axios.put(`/api/design/${id}`, designState);
      if (res.data) {
        dataRef.current = res.data;
        dispatch(designSlice.actions.setData(res.data));
      }
    } catch (e) {
      console.error('Save error', e);
    }
  };

  React.useEffect(() => {
    id && fetchDesignData(id);
  }, [id, router]);

  const designState = useSelector(getDesignState);
  const selectedPage = useSelector(getSelectedPage);
  const themeStr = useSelector(getTheme);

  React.useEffect(() => {
    id && saveDesignState(id, designState);
  }, [designState]);

  const theme = React.useMemo(() => {
    return createTheme(eval(themeStr));
  }, [themeStr]);

  return (id && id === designState.id) && (
    <DesignToolContainer>
      <ThemeProvider theme={theme}>
        {selectedPage?.components.map(componentData => {
          return <DraggableContainer componentData={componentData} />;
        })}
      </ThemeProvider>
    </DesignToolContainer>
  )
}