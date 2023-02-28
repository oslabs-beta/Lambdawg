
import React, { useState, useEffect } from 'react';

const Panel = (props) => {

  const { setPanelFullScreen, panelFullScreen } = props;

  // get the list of functions in heirarchal order and display them as a list of 'buttons' >
  // onClick a button will expand display the functions metrics in the same window, onClick it will hide them
  // the corresponding node on the diagram will be highlighted


  
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        <div id='testClick'></div>
        <ul id='panelUl'>
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