
import React, { useState, useEffect } from 'react';

const Panel = (props) => {

  // Bullshit crap ass minimization / full screen for heirarchy view
  // const [isOpen, setIsOpen] = useState(false);

  //   useEffect(() => {
  //     const handleClick = () => {
  //       setIsOpen(prevOpen => !prevOpen);
  //     };
  //     document.body.addEventListener('click', handleClick);
  //     return () => {
  //       document.body.removeEventListener('click', handleClick);
  //     };
  //   }, []);

  //   const panelWrapperHeight = isOpen ? '90vh' : '3.5rem';

    return(

      // <div id="panel-wrapper" style={{ height: panelWrapperHeight }}>

      <div id="panel-wrapper" >
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