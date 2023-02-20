
import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Panel from '../components/Panel.jsx';
import DiagramContainer from '../containers/DiagramContainer.jsx';
import DataWindow from '../components/DataWindow.jsx';

const DashboardContainer = (props) => {
  return (
    <div>
      <div className='dashboard-container'>
        <Navbar className='navbar'/>
        <Panel className='left-window'/>
        <DiagramContainer className='chart-window'/>
        <DataWindow className='bottom-window'/>

      </div>
    </div>
  )
}
export default DashboardContainer;