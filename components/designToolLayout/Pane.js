import { useCallback } from 'react';
import { debounce } from 'lodash';
import usePanZoom from "use-pan-and-zoom";

import Box from '@mui/material/Box';

import { useSelector, useDispatch } from '../../store/store';
import designSlice, { getSelectedPagePanState } from '../../store/designSlice';

export default function PaneContainer (props) {
  const dispatch = useDispatch();

  const panState = useSelector(getSelectedPagePanState);

  const updatePanStateCB = (position, transform, zoom) => {
    dispatch(designSlice.actions.updatePanState({ position, transform, zoom }))
  };
  const debounceUpdatePanStateCB = useCallback(debounce(updatePanStateCB, 250), []);

  const { transform, zoom, setContainer, panZoomHandlers } = usePanZoom({
    minZoom: 0.2,
    initialZoom: panState.zoom,
    initialPan: panState.position,
    onPanEnd: () => debounceUpdatePanStateCB({ x: transform.x, y: transform.y }, transform, zoom ),
    onZoom: (transform) => debounceUpdatePanStateCB({ x: transform.x, y: transform.y }, transform, zoom ),
  });

  const _setContainer = (el) => {
    const zoom = setContainer(el);
    zoom && zoom();
  }

  return (
    <Box
      sx={{
        minWidth: '100%',
        minHeight: '100vh',
        touchAction: 'none',
        transform: transform,
        '&:before': {
          content: '""',
          display: 'block',
          height: '20000%',
          width: '20000%',
          position: 'absolute',
          top: '-5000%',
          left: '-5000%',
          // background: 'black'
        }
      }}
      ref={_setContainer}
      {...panZoomHandlers}
    >
      {props.children}
    </Box>
  );
}
