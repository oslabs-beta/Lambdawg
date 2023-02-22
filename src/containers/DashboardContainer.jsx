
import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Panel from '../components/Panel.jsx';
import DiagramContainer from '../containers/DiagramContainer.jsx';
import DataWindow from '../components/DataWindow.jsx';

const DashboardContainer = (props) => {
  return (
    
      <div id='dashboard-container'>

        {/* <Navbar id='navbar-container'/> */}

          <div id="dashboard-wrapper">
            <Panel />
            <DiagramContainer />
          </div>

        <DataWindow />

      </div>
    
  )
}
export default DashboardContainer;