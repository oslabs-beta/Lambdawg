
import React, { useState } from 'react';

const DataWindow = (props) => {
const { dataWindowFullScreen, setDataWindowFullScreen } = props


  return(
    <div id='data-window-wrapper' className={dataWindowFullScreen ? 'fullscreen' : 'collapse-screen'}>

    <code>
      <ul id='log-ul'></ul>
    </code>
    
    </div>
  )
}
export default DataWindow;