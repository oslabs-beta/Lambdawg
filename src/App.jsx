
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
// import Auth from './components/Auth.jsx';
// import Docs from './components/Docs.jsx';
import './App.css';



const App = () => {
  // const [loggedIn, setLoggedIn] = useState();
  // check if they're logged in - if yes, setLoggedIn to true else false
    // if loggedIn false, show landing page
    // if loggedIn true, show dashboard
  // setLoggedIn(true); // hard coded until we set up auth

  return (
    <div className="router">
      <div className="routerMain" id="content">
        <Routes>
          {/* <Route exact path="/" element={<LandingPage/>} /> // first timers welcome
          <Route exact path="/auth" element={<Auth/>} />  // login & signup (toggleable) */}
          <Route exact path="/dashboard" element={<DashboardContainer/>} />
          {/* <Route exact path="/docs" element={<Docs/>} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;