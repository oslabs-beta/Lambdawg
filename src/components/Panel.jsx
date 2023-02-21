
import React, { useState } from 'react';

const Panel = (props) => {



  return(
    <div id="panel-wrapper">
      <h1>Panel</h1>
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