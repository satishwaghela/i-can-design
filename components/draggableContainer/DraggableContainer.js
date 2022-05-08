import * as React from 'react';
import Draggable from 'react-draggable';
import { Box, Button } from '@mui/material';

import { useSelector, useDispatch } from '../../store/store';
import designSlice, { getSelectedPageZoom } from '../../store/designSlice';

export default function DraggableContainer (props) {
  const dispatch = useDispatch();

  const { componentData } = props;

  const [content, setContent] = React.useState(null);

  const zoomScale = useSelector(getSelectedPageZoom);

  React.useEffect(() => {
    window.React = React;
    window.Button = Button;
    setContent(eval(componentData.transformedComponent))
  }, [componentData.transformedComponent]);

  const onDragStart = (e, data) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragStop = (e, data) => {
    const { x, y } = data;
    dispatch(designSlice.actions.updateComponentPanState({ panState: { position: { x, y } }, componentData }));
  };

  return (
    <Draggable
      defaultPosition={componentData.panState.position}
      scale={zoomScale}
      onStart={onDragStart}
      onStop={onDragStop}
    >
      <Box style={{ display: 'inline-block' }}>
        <Box style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }} />
        {content}
      </Box>
    </Draggable>
  );
}
