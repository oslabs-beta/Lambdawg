
import React, { useState, useEffect } from 'react';
import { VscSettingsGear, VscBook, VscColorMode, VscMenu } from 'react-icons/vsc';

const Navbar = (props) => {

    const docsLink = '/docs';
    const settingsLink = './settings';
    const mascot = 'src/assets/mascot.png'
    const { loggedIn } = props;

    useEffect(() => {
      const hamburgerMenu = document.getElementById('hamburger-menu');
      const hamburgerIcon = document.getElementById('hamburger-icon');
  
      hamburgerIcon.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('collapse-burger-menu');
      });
  
      // Remove the event listener when the component unmounts
      return () => {
        // hamburgerIcon.removeEventListener('click');
      };
    }, []); // Empty dependency array ensures that the effect runs only once
  

    return(
      
        <div id="navbar-container">
        
            <span className='nav-item-logo'>
              <img src={mascot} className='mascot'/>
              <h1>LAMBDAWG</h1>
            </span>
        
          <div className='nav-item-group'>


            <ul id='desktop-menu' className='collapse-desktop-menu'>
              <li>Documentation</li>
              <li>Settings</li>
              <li>Log in / out</li>
            </ul>

            <VscMenu id='hamburger-icon' />
            <ul id='hamburger-menu' className='collapse-burger-menu'>
              <li>Docs</li>
              <li>Settings</li>
              <li>Log in</li>
            </ul>

          </div>
        </div>
   
    );
  };
  
  export default Navbar;