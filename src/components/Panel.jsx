
import React, { useState, useEffect } from 'react';
import Microservice from '../components/Microservice.jsx';

const Panel = (props) => {

  const { setPanelFullScreen, panelFullScreen, msNames } = props;
  // get the list of functions in heirarchal order and display them as a list of 'buttons' >
  // onClick a button will expand display the functions metrics in the same window, onClick it will hide them
  // the corresponding node on the diagram will be highlighted
  const names = []
  msNames.forEach((name) => {
    names.push(<Microservice name={name} className='panel-names'/>)
  })

  
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        {names}
      </div>
    )
  }
  export default Panel;