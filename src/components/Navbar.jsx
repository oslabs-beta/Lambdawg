import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';

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

  const navigate = useNavigate();
  const handleLinkClick = () => {
    setNavChecked(false);
  };

  // create a tracker for dark mode in state
  const [mode, setMode] = useState('light');
  // If state is 'dark' transition to 'light' and vice-versa
  //the function creates a progressive transition to dark or light
  const darkMode = (mode = 'dark') => {
    let transition;
    mode === 'dark' ? (transition = 1) : (transition = 0);
    const htmlElement = document.querySelector('html');

    if (!htmlElement) {
      console.error('Unable to find HTML element.');
      return;
    }

    const applyFilter = () => {
      console.log('Applying filter with transition value: ' + transition);
      htmlElement.style.filter = `invert(${transition})`;
      mode === 'dark'
        ? (() => {
            if (transition >= 0) {
              transition -= 0.1;
              setTimeout(applyFilter, 30);
            }
          })()
        : (() => {
            if (transition <= 1) {
              transition += 0.1;
              setTimeout(applyFilter, 30);
            }
          })();
    };

    setTimeout(applyFilter, 30);
  };

  //handle state and triggest transition on click
  const darkClick = () => {
    console.log('this.state.mode ' + mode);
    setMode(mode === 'dark' ? 'light' : 'dark');
    darkMode(mode);
  };

  const handleLinkClickAuth = async () => {
    if (loggedIn) {
      try {
        const response = await fetch('/api/logout', {
          credentials: 'include',
        });
        if (response.ok) {
          setLoggedIn(false);
          navigate('/auth');
          console.log('logout worked yo!');
        } else console.log('logout didnt work brah', loggedIn);
      } catch (error) {
        console.log('catch block in logout');
      }
    }
    setNavChecked(false);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div className='nav'>
      <input
        type='checkbox'
        id='nav-check'
        checked={navChecked}
        onChange={() => setNavChecked(!navChecked)}
      />
      <div className='nav-header'>
        <div className='nav-title'>
          <div className='nav-logo-wrapper'>
            <Link to={homeLink}>
              <img src={mascot} className='nav-logo' />
              <img src={logoText} className='text-logo' />
            </Link>
          </div>
        </div>
      </div>
      <div className='nav-btn'>
        <label htmlFor='nav-check'>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className='nav-links'>
        <div className='menuTop'>
          <label className='switchLabel'>
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </label>
          <Switch {...label} onClick={darkClick} />
        </div>
        <Link to={docsLink} onClick={handleLinkClick}>
          Documentation
        </Link>
        {user.arn && (
          <Link to={dashLink} onClick={handleLinkClick}>
            Dashboard
          </Link>
        )}
        <Link to={settingsLink} onClick={handleLinkClick}>
          Settings
        </Link>
        <Link to={authLink} onClick={handleLinkClickAuth}>
          {loggedIn ? 'Log out' : 'Log in'}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
