
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// import { VscSettingsGear, VscBook, VscColorMode, VscMenu, VscKey, VscFileCode } from 'react-icons/vsc';

const Navbar = (props) => {
  const { loggedIn, setLoggedIn, user } = props;
  const [navChecked, setNavChecked] = useState(false);

    const docsLink = '/docs';
    const dashLink = '/dashboard';
    const settingsLink = './settings';
    const authLink = './auth';
    const homeLink = '/';
    const mascot = 'src/assets/mascot_head.svg';
    const logoText = 'src/assets/logo-text.png';

    const handleLinkClick = () => {
      setNavChecked(false);
    };

    const handleLinkClickAuth = async () => {
      if (loggedIn){
        const response = await fetch('/api/logout')
        if (response.ok) {
          setLoggedIn(false);
          console.log('logout worked yo!')
        }
        else console.log('logout didnt work brah')
      }
      // setLoggedIn(false);
      setNavChecked(false);
    }

    return(
      
        <div className="nav">
      <input type="checkbox" id="nav-check" checked={navChecked} onChange={() => setNavChecked(!navChecked)} />
          <div className="nav-header">
            <div className="nav-title">
            <div className='nav-logo-wrapper'>
              <Link to={homeLink}>
                <img src={mascot} className='nav-logo'/>
                <img src={logoText} className='text-logo'/>
              </Link>

            </div>
            </div>
          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
        <span></span>
        <span></span>
        <span></span>
            </label>
          </div>
          
          <div className="nav-links">
            <Link to={docsLink} onClick={handleLinkClick}>Documentation</Link>
            {user.arn && <Link to={dashLink} onClick={handleLinkClick}>Dashboard</Link>}
            <Link to={settingsLink} onClick={handleLinkClick}>Settings</Link>
            <Link to={authLink} onClick={handleLinkClickAuth}>{loggedIn ? 'Log out' : 'Log in'}</Link>
          </div>
        </div>
    );
  };
  
  export default Navbar;