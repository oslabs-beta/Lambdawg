
import React, { useState, useEffect } from 'react';
import { VscSettingsGear, VscBook, VscColorMode, VscMenu, VscKey, VscFileCode } from 'react-icons/vsc';

const MainNavbar = (props) => {

    const docsLink = '/docs';
    const settingsLink = './settings';
    const mascot = 'src/assets/mascot_head.svg'
    const { loggedIn } = props;




    return(
      
        <div id="navbar-container">
        
            <span className='nav-item-logo'>
              <img src={mascot} className='mascot'/>
              <h1>LAMBDAWG</h1>
            </span>
        
          <div className='nav-item-group'>

{/* 
            <ul id='menu' className=''>
              <li><a href={docsLink}><VscFileCode className='nav-icon'/>Documentation</a></li>
              <li><a href={settingsLink}><VscSettingsGear className='nav-icon'/>Settings</a></li>
              <li><a href='./auth'><VscKey className='nav-icon'/>Log in/out</a></li>
            </ul> */}

          <div id='mobile-menu' className=''>
            <a href={docsLink}><VscFileCode className='nav-icon'/></a>
            <a href={settingsLink}><VscSettingsGear className='nav-icon' /></a>
            <a href="./auth"><VscKey className='nav-icon' /></a>
          </div>

          </div>
        </div>
   
    );
  };
  
  export default MainNavbar;