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
    requireCtrlToZoom: true,
    enablePan: false,
    onZoom: (transform) => debounceUpdatePanStateCB({ x: transform.x, y: transform.y }, transform, zoom ),
  });

  const _setContainer = (el) => {
    const zoom = setContainer(el);
    zoom && zoom();
  }

  return (
    <Box sx={{ flexGrow: 1, touchAction: 'none', overflow: 'auto' }} ref={_setContainer} {...panZoomHandlers}>
      <Box
        sx={{
          transform: transform
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
