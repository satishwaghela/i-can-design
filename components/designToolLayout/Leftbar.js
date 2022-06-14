import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from '../../store/store';

import designSlice, { getSelectedPage } from '../../store/designSlice';

export default function Leftbar() {
  const dispatch = useDispatch();
  const selectedPage = useSelector(getSelectedPage);

  const handleAddNew = () => {
    dispatch(designSlice.actions.addComponent());
  };

  return (
    <Box sx={{ width: "250px", background: '#fff', p: 1 }}>
      <Typography variant='h6'>Components</Typography>
      <Button variant='contained' fullWidth sx={{ my: 1 }} onClick={handleAddNew}>Add New</Button>
      {selectedPage.components.map(c => {
        return (
          <>
            <Box onClick={() => dispatch(designSlice.actions.selectComponent(c))}>
              {c.component.substr(0, 10)}
            </Box>
            <Divider />
          </>
        );
      })}
    </Box>
  );
}
