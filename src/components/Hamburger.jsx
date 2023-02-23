
import React, { useState, useEffect } from 'react';
import { VscMenu } from 'react-icons/vsc';

  
const Hamburger = (props) => {

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
      hamburgerIcon.removeEventListener('click');
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  return(
      <div id="navbar-container">
      
          <span className='nav-item-logo'>
        
            <h1>L A M B D A W G </h1>
          </span>
      
          <VscMenu id='hamburger-icon' className='hamburger-icon' />

      <ul id='hamburger-menu' className='collapse-burger-menu'>
        <li>Docs</li>
        <li>Settings</li>
        <li>Log in</li>
        <li>Docs</li>
        <li>Settings</li>
        <li>Log in</li>
      </ul>


    </div>
  );
};

export default Hamburger;
