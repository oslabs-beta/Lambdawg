
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import Panel from '../components/Panel.jsx';
import DiagramContainer from '../containers/DiagramContainer.jsx';
import DataWindow from '../components/DataWindow.jsx';

const DashboardContainer = (props) => {

  const { loggedIn, setLoggedIn } = props;

  // redirect unauthorized user to auth page
  useEffect(() => {
      const isUserAuthenticated = () => {
        // Check for a session cookie?
        return true; // Return true or false depending on cookie
      };
      setLoggedIn(isUserAuthenticated());
    }, []);

    if (!loggedIn) return <Navigate replace to="/auth" />;

  return (
    
      <div id='dashboard-container'>

          <div id="dashboard-wrapper">
            <Panel />
            <DiagramContainer />
          </div>

        <DataWindow />

      </div>
    
  )
}
export default DashboardContainer;