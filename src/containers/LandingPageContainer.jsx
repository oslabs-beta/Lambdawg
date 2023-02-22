
import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';

const LandingPageContainer = (props) => {
  return (
    
        <div>
          <Navbar id='navbar-container'/>
          <h1>Welcome!</h1>
          <p>This is the landing page</p>
        </div>
  )
}
export default LandingPageContainer;