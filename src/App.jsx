
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer.jsx';
import LandingPageContainer from './containers/LandingPageContainer.jsx';
import Auth from './components/Auth.jsx';
import Docs from './components/Docs.jsx';
import Settings from './components/Settings.jsx';
import Navbar from './components/Navbar.jsx';

import './styles/application.scss';



const App = () => {
  // const [loggedIn, setLoggedIn] = useState();
  // check if they're logged in - if yes, setLoggedIn to true else false
    // if loggedIn false, show landing page
    // if loggedIn true, show dashboard
  // setLoggedIn(true); // hard coded until we set up auth

  return (
    <div className="router">
        <Navbar id='navbar-container'/>
      <div className="routerMain" id="content">
        <Routes>
          <Route exact path="/auth" element={<Auth/>} />  // login & signup (toggleable)
          <Route exact path="/dashboard" element={<DashboardContainer/>} />
          <Route exact path="/docs" element={<Docs/>} />
          <Route exact path="/settings" element={<Settings/>} />
          <Route exact path="/" element={<LandingPageContainer/>} /> // first timers welcome

        </Routes>
      </div>
    </div>
  );
};

export default App;