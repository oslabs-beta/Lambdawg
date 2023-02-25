
import React, { useState, useEffect } from 'react';

const Panel = (props) => {

  const { setPanelFullScreen, panelFullScreen } = props;

  
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        
        <ul>
          <li> This is a thing </li>
            <ul>
            <li> This is a thing </li>
            <li> This is a thing </li>
            <li> This is a thing </li>
            </ul>
          <li> This is a thing </li>
          <li> This is a thing </li>
          <li> This is a thing </li>
          <li> This is a thing </li>
          <ul>
            <li> This is a thing </li>
            </ul>
          <li> This is a thing </li>
          <li> This is a thing </li>
          <li> This is a thing </li>
          <ul>
            <li> This is a thing </li>
            </ul>
          <li> This is a thing </li>
          <li> This is a thing </li>
          <li> This is a thing </li>
        </ul>
      </div>
    )
  }
  export default Panel;