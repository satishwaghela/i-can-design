import * as React from 'react';
import Draggable from 'react-draggable';
import { Box, Button } from '@mui/material';

export default function DraggableContainer (props) {
  const { stringToRender } = props;

  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    window.React = React;
    window.Button = Button;
    setContent(eval(stringToRender))
  }, [])

  return (
    <Draggable>
      <Box style={{ display: 'inline-block' }}>
        {content}
      </Box>
    </Draggable>
  );
}
