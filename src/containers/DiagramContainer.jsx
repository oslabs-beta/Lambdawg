
import React, { useState } from 'react';

const DiagramContainer = (props) => {
const { diagramFullScreen, setDiagramFullScreen } = props;


  return(
    // <div id='diagram-container-wrapper' className='full-screen'>

      <div id='diagram-container-wrapper' className={diagramFullScreen? 'full-screen' : 'collapse-screen'}> 
        {/* <img src='src/assets/cluster.png' id='cluster-temp-img'/> */}
        <iframe id='chart-frame' width='100%' src='/src/Chart/index.html' />
      </div>
  )
}
export default DiagramContainer;