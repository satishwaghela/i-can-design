import * as React from 'react';
import { sortable } from 'react-sortable';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from '../../store/store';

import designSlice, { getSelectedPage, filterSelectedComponents } from '../../store/designSlice';

export default function Leftbar() {
  const dispatch = useDispatch();
  const selectedPage = useSelector(getSelectedPage);
  const selectedComponents = useSelector(filterSelectedComponents);
  let selectedComponent = null;
  if (selectedComponents.length === 1) {
    selectedComponent = selectedComponents[0];
  }

  const handleAddNew = () => {
    dispatch(designSlice.actions.addComponent());
  };

  const onSortItems = (components) => {
    dispatch(designSlice.actions.setComponents(components));
  };

  return (
    <Box sx={{ width: "250px", background: '#fff', p: 1 }}>
      <Typography variant='h6'>Components</Typography>
      <Button variant='contained' fullWidth sx={{ my: 1 }} onClick={handleAddNew}>Add New</Button>
      <ul className='sortable-list'>
        {selectedPage.components.map((c, i) => {
          return (
            <SortableItem
              key={i}
              onSortItems={onSortItems}
              items={[...selectedPage.components]}
              sortId={i}>
                <Box onClick={() => dispatch(designSlice.actions.selectComponent(c))} sx={{ fontWeight: c === selectedComponent ? 600 : 400 }}>
                  {c.component.substr(0, 10)}
                </Box>
                <Divider />
            </SortableItem>
          );
        })}
      </ul>
    </Box>
  );
}

function Item (props) {
  return (
    <li {...props}>
      {props.children}
    </li>
  )
}

let SortableItem = sortable(Item);
