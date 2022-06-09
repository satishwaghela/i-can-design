import * as React from 'react';
import Draggable from 'react-draggable';
import { Box, Button } from '@mui/material';

import ErrorBoundary from '../ErrorBoundry';

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
    try {
      const code = componentData.transformedComponent;
      const content = eval(code);
      setContent(content);
    } catch (e) {
      console.error('Eval error', e);
    }
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
      <Box style={{ display: 'inline-block', position: 'absolute' }}>
        <Box style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }} onClick={() => dispatch(designSlice.actions.selectComponent(componentData))} />
        <ErrorBoundary key={componentData.transformedComponent}>
          {content}
        </ErrorBoundary>
      </Box>
    </Draggable>
  );
}
