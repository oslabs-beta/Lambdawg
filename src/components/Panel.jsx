
import React, { useState, useEffect } from 'react';
import Microservice from '../components/Microservice.jsx';

const Panel = (props) => {

  const { setPanelFullScreen, panelFullScreen, msNames, msMetrics } = props;
  // get the list of functions in heirarchal order and display them as a list of 'buttons' >
  // onClick a button will expand display the functions metrics in the same window, onClick it will hide them
  // the corresponding node on the diagram will be highlighted

  // iterate through function names and display as buttons > send metrics data to microservices
  // if (msMetrics) console.log('panel metrics', msMetrics)
  const names = []
  let i = 0;
  if (msNames){
    msNames.forEach((name) => {
      names.push(<Microservice name={name} key={`${name}MsEl${i}`} msMetrics={msMetrics} className='panel-names'/>)
    })
  }


  
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        {names}
        {/* <h1>hello</h1> */}
      </div>
    )
  }
  export default Panel;