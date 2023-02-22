
import React, { useState } from 'react';
import { VscSettingsGear, VscBook, VscColorMode } from 'react-icons/vsc';

const Navbar = (props) => {

    const docsLink = '/docs';
    const settingsLink = './settings';
    const mascot = 'src/assets/mascot.png'
    const { loggedIn } = props;

    return(
      <div id="navbar-container">
       
          <span className='nav-item-logo'>
          {loggedIn && (
            <img src='src/assets/mascot.png' className='mascot'/>
            )}
            <h1>L A M B D A W G </h1>
          </span>
        
  
        <div className='nav-item-group'>
          <VscColorMode className='nav-icon'/>
          <a href={docsLink}>
            <VscBook className='nav-icon'/>
          </a>
  
          {loggedIn && (
            <a href={settingsLink}>
              <VscSettingsGear className='nav-icon'/>
            </a>
          )}
        </div>       
      </div>
    );
  };
  
  export default Navbar;
  // In this modified code, the loggedIn prop is used to conditionally render the img tag and the settings icon. The img tag and the settings icon are wrapped in conditional statements that only render the elements when the loggedIn prop is true. If loggedIn is false, the img tag and the settings icon will not be rendered.
  
  
  
  
  