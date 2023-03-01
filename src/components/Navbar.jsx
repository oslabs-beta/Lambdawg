
import React, { useState, useEffect } from 'react';
import { VscSettingsGear, VscBook, VscColorMode, VscMenu, VscKey, VscFileCode } from 'react-icons/vsc';

const MainNavbar = (props) => {

    const docsLink = '/docs';
    const settingsLink = './settings';
    const authLink = './auth';
    const mascot = 'src/assets/mascot_head.svg'
    const logoText = 'src/assets/logo-text.png'

    const { loggedIn } = props;




    return(
      
        <div class="nav">
          <input type="checkbox" id="nav-check" />
          <div class="nav-header">
            <div class="nav-title">
            <div class='nav-logo-wrapper'>
              <img src={mascot} className='nav-logo'/>
              <img src={logoText} className='text-logo'/>

              {/* <h1 class='nav-text-logo'>LAMBDAWG</h1> */}
            </div>
            </div>
          </div>
          <div class="nav-btn">
            <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
            </label>
          </div>
          
          <div class="nav-links">
            <a href={docsLink} target="_blank">Documentaion</a>
            <a href={settingsLink} target="_blank">Settings</a>
            <a href={authLink} target="_blank">Login</a>
        
          </div>
        </div>
      
        // <div id="menu-navbar-container">
        
        //     <span className='nav-item-logo'>
        //       <img src={mascot} className='mascot'/>
        //       <h1>LAMBDAWG</h1>
        //     </span>
        
        //   <div className='menu-nav-item-group'>

        //   <ul className='menu-desktop'>
        //     <a href="">Documentaion</a><br />
        //     <a href="">Settings</a><br />
        //     <a href="">Login</a><br />
        //   </ul>


        //   </div>
        // </div>
   
    );
  };
  
  export default MainNavbar;