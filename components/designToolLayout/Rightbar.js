import * as React from 'react';
import Editor from "@monaco-editor/react";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import { useSelector, useDispatch } from '../../store/store';
import designSlice, { filterSelectedComponents } from '../../store/designSlice';

const options = {
  selectOnLineNumbers: true,
  tabSize: 2
};

export default function Rightbar() {
  const dispatch = useDispatch();
  const selectedComponents = useSelector(filterSelectedComponents);
  let selectedComponent = null;
  if (selectedComponents.length === 1) {
    selectedComponent = selectedComponents[0];
  }

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open
    >
      <Box sx={{ width: "450px" }}>
        {selectedComponent && (
          <Editor
            key={selectedComponent.id}
            height="100vh"
            defaultLanguage="javascript"
            defaultValue={selectedComponent?.component}
            theme="vs-dark"
            options={options}
            onChange={(value) => { dispatch(designSlice.actions.updateComponent({ ...selectedComponent, component: value })) }}
            editorDidMount={() => {}}
          />
        )}
      </Box>
    </Drawer>
  );
}
