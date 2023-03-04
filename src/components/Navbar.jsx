
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// import { VscSettingsGear, VscBook, VscColorMode, VscMenu, VscKey, VscFileCode } from 'react-icons/vsc';

const Navbar = (props) => {
  const { loggedIn } = props;
  const [navChecked, setNavChecked] = useState(false);

    const docsLink = '/docs';
    const settingsLink = './settings';
    const authLink = './auth';
    const homeLink = '/';
    const mascot = 'src/assets/mascot_head.svg';
    const logoText = 'src/assets/logo-text.png';

    const handleLinkClick = () => {
      setNavChecked(false);
    };

    return(
      
        <div class="nav">
      <input type="checkbox" id="nav-check" checked={navChecked} onChange={() => setNavChecked(!navChecked)} />
          <div class="nav-header">
            <div class="nav-title">
            <div class='nav-logo-wrapper'>
              <Link to={homeLink}>
                <img src={mascot} className='nav-logo'/>
                <img src={logoText} className='text-logo'/>
              </Link>

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
            <Link to={docsLink} onClick={handleLinkClick}>Documentaion</Link>
            <Link to={settingsLink} onClick={handleLinkClick}>Settings</Link>
            <Link to={authLink} onClick={handleLinkClick}>Login</Link>
          </div>
        </div>
    );
  };
  
  export default Navbar;