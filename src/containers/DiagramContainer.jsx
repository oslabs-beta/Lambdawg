
import React, { useState } from 'react';

const DiagramContainer = (props) => {
const { diagramFullScreen, setDiagramFullScreen } = props;


  return(
    // <div id='diagram-container-wrapper' className='full-screen'>

      <div id='diagram-container-wrapper' className={diagramFullScreen? 'full-screen' : 'collapse-screen'}> 
        <img src='src/assets/cluster.png' id='cluster-temp-img'/>
      </div>
  )
}
export default DiagramContainer;