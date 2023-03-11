
import React, { useState, useEffect } from 'react';
import Microservice from '../components/Microservice.jsx';

const Panel = (props) => {

  const { setPanelFullScreen, panelFullScreen, msNames, msMetrics, user, msLogs, setMsLogs } = props;
  // get the list of functions in heirarchal order and display them as a list of 'buttons' >
  // onClick a button will expand display the functions metrics in the same window, onClick it will hide them
  // the corresponding node on the diagram will be highlighted

  // iterate through function names and display as buttons > send metrics data to microservices
  // if (msMetrics) console.log('panel metrics', msMetrics)
  const names = []
  let i = 0;
  if (msNames){
    msNames.forEach((name) => {
      i++;
      names.push(<Microservice name={name} key={`${name}MsEl${i}`} msMetrics={msMetrics} user={user} className='panel-names'msLogs={msLogs} setMsLogs={setMsLogs}/>)
    })
  }


  
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        {names}
      </div>
    )
  }
  export default Panel;