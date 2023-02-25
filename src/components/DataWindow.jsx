
import React, { useState } from 'react';

const DataWindow = (props) => {
const { dataWindowFullScreen, setDataWindowFullScreen } = props


  return(
    <div id='data-window-wrapper' className={dataWindowFullScreen ? 'fullscreen' : 'collapse-screen'}>

    <ul>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
      <li>ERROR: You are too cool for school</li>
    </ul>
    </div>
  )
}
export default DataWindow;