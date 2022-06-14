import * as React from 'react';
import { merge } from 'lodash';
import Draggable from 'react-draggable';
import * as MuiComponent from '@mui/material';
import Box from '@mui/material/Box';

import ErrorBoundary from '../ErrorBoundry';

import { useSelector, useDispatch } from '../../store/store';
import designSlice, { getSelectedPageZoom, filterSelectedComponents } from '../../store/designSlice';


export default function DraggableContainer (props) {
  const dispatch = useDispatch();
  const selectedComponents = useSelector(filterSelectedComponents);
  let selectedComponent = null;
  if (selectedComponents.length === 1) {
    selectedComponent = selectedComponents[0];
  }

  const { componentData } = props;

  const [content, setContent] = React.useState(null);

  const zoomScale = useSelector(getSelectedPageZoom);

  React.useEffect(() => {
    window.React = React;
    merge(window, MuiComponent);
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
      disabled={componentData !== selectedComponent}
      key={componentData.id}
    >
      <Box style={{ display: 'inline-block', position: 'absolute' }}>
        <Box style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 }} onClick={() => dispatch(designSlice.actions.selectComponent(componentData))} />
        <ErrorBoundary key={componentData.transformedComponent}>
          {content}
        </ErrorBoundary>
      </Box>
    </Draggable>
  );
}
