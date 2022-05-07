import * as React from 'react';
import Draggable from 'react-draggable';
import { Box, Button } from '@mui/material';

import { useSelector } from '../../store/store';

export default function DraggableContainer (props) {
  const { stringToRender } = props;

  const [content, setContent] = React.useState(null);

  const zoom = useSelector(state => state.design.panState.zoom);

  React.useEffect(() => {
    window.React = React;
    window.Button = Button;
    setContent(eval(stringToRender))
  }, []);

  const onDragStart = (e, data) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Draggable onStart={onDragStart} scale={zoom}>
      <Box style={{ display: 'inline-block' }}>
        <Box style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }} />
        {content}
      </Box>
    </Draggable>
  );
}
