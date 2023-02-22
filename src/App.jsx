
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer.jsx';
import LandingPageContainer from './containers/LandingPageContainer.jsx';
import Auth from './components/Auth.jsx';
import Docs from './components/Docs.jsx';
import Settings from './components/Settings.jsx';
import Navbar from './components/Navbar.jsx';

import './styles/application.scss';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  // check if they're logged in - if yes, setLoggedIn to true 
  useEffect(() => {
    const isUserAuthenticated = () => {
      // Check for a session cookie?
      return false; // Return true or false depending on cookie
    };
    setLoggedIn(isUserAuthenticated());
  }, []);


  return (
    <div className="router">
        <Navbar id='navbar-container' loggedIn={loggedIn} />
      <div className="routerMain" id="content">
        <Routes>
          <Route exact path="/auth" element={<Auth />} />  
          <Route exact path="/dashboard" element={<DashboardContainer/>} />
          <Route exact path="/docs" element={<Docs/>} />
          <Route exact path="/settings" element={<Settings/>} />
          <Route exact path="/" element={<LandingPageContainer/>} /> 

        </Routes>
      </div>
    </div>
  );
};

export default App;