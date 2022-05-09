import Leftbar from '../designToolLayout/Leftbar';
import Rightbar from '../designToolLayout/Rightbar';
import Pane from '../designToolLayout/Pane'

function DesignToolContainer(props) {
  return (
    <>
      <Leftbar />
      <Rightbar />
      <Pane>
        {props.children}
      </Pane>
    </>
  )
}

export default DesignToolContainer
