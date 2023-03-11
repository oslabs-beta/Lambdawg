
import React, { useState, useEffect } from 'react';
import LamdaButton from '../components/LamdaButton.jsx';

const Panel = (props) => {

  const { setPanelFullScreen, panelFullScreen, msNames, msMetrics, user, msLogs, setMsLogs } = props;
 
  const names = []
  let i = 0;
  if (msNames){
    msNames.forEach((name) => {
      i++;
      names.push(<LamdaButton name={name} key={`${name}MsEl${i}`} msMetrics={msMetrics} user={user} className='panel-names'msLogs={msLogs} setMsLogs={setMsLogs}/>)
    })
  }


  
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        {names}
      </div>
    )
  }
  export default Panel;