import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from '../../store/store';

import { getDesignState } from '../../store/designSlice';

export default function NewDesign(props) {
  const router = useRouter();

  const saveDesignState = async (id, designState) => {
    await axios.put(`/api/design/${id}`, designState);
    router.push(`/design/${id}`)
  };

  const designState = useSelector(getDesignState);

  React.useEffect(() => {
    saveDesignState(designState.id, designState);
  }, [designState]);

  return null;
}
