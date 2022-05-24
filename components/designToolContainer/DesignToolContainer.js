import Box from '@mui/material/Box';
import Leftbar from '../designToolLayout/Leftbar';
import Rightbar from '../designToolLayout/Rightbar';
import Pane from '../designToolLayout/Pane'

function DesignToolContainer(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Leftbar />
      <Pane>
        {props.children}
      </Pane>
      <Rightbar />
    </Box>
  )
}

export default DesignToolContainer
