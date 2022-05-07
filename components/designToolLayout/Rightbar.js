import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

export default function Rightbar() {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open
    >
      <Box sx={{ width: "250px" }}>
      </Box>
    </Drawer>
  );
}
