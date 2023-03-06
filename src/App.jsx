
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer.jsx';
import LandingPageContainer from './containers/LandingPageContainer.jsx';
import Auth from './components/Auth.jsx';
import Docs from './components/Docs.jsx';
import SettingsContainer from './containers/SettingsContainer.jsx';
import Navbar from './components/Navbar.jsx';

import './styles/application.scss';

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  // check if they're logged in - if yes, setLoggedIn to true 
  useEffect(() => {
    const isUserAuthenticated = () => {
      // Check for a session cookie?
      return (loggedIn)? setLoggedIn(true) : setLoggedIn(false) // temp til cookies work
       // Return true or false depending on cookie
    };
    setLoggedIn(isUserAuthenticated());
  }, []);



  return (
    <div className="router">
      <Navbar loggedIn={loggedIn} />
      <div className="routerMain" id="content">
        <Routes>
          
          <Route exact path="/dashboard" element={
            loggedIn ? <DashboardContainer loggedIn={loggedIn}/> : 
            <Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}/>
          } /> 
          <Route exact path="/settings" element={
            loggedIn ? <SettingsContainer user={user} loggedIn={loggedIn}/> : 
            <Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}/>
          } /> 
          <Route exact path="/auth" element={
            loggedIn ? <DashboardContainer loggedIn={loggedIn}/> : 
            <Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}/>
          } /> 
          {/* <Route exact path="/auth" element={<Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />   */}
          {/* <Route exact path="/dashboard" element={<DashboardContainer loggedIn={loggedIn}/>} /> */}
          <Route exact path="/docs" element={<Docs/>} />
          {/* <Route exact path="/settings" element={<SettingsContainer loggedIn={loggedIn}/>} /> */}
          <Route exact path="/" element={<LandingPageContainer/>} /> 

        </Routes>
      </div>
    </div>
  );
};

export default App;