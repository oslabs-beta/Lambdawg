
import React, { useState } from 'react';

const DiagramContainer = (props) => {
const { diagramFullScreen, setDiagramFullScreen } = props;

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (event.origin !== "http://localhost:5173") return;
  document.getElementById("testClick").textContent = event.data; // the node id 
  // This provides us the id of the node that was clicked
  // trigger the onclick for that node's button in the side panel
}


  return(

      <div id='diagram-container-wrapper' className={diagramFullScreen? 'full-screen' : 'collapse-screen'}> 
        <iframe id='chart-frame' width='100%' src='/src/Chart/index.html' />
      </div>
  )
}
export default DiagramContainer;