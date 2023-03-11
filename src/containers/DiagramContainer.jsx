
import React, { useState } from 'react';

const DiagramContainer = (props) => {
const { diagramFullScreen } = props;

// window.addEventListener("message", receiveMessage, false);
// function receiveMessage(event) {
//   if (event.origin !== "http://localhost:5173") return;
//   document.getElementById("testClick").textContent = event.data; // the node id 
// }


  return(

      <div id='diagram-container-wrapper' className={diagramFullScreen? 'full-screen' : 'collapse-screen'}> 
        <iframe id='chart-frame' width='100%' src='/src/Chart/index.html' />

      </div>
  )
}
export default DiagramContainer;