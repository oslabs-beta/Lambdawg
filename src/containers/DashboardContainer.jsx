
import React, { useState} from 'react';
import { Navigate } from "react-router-dom";
import Panel from '../components/Panel.jsx';
import DiagramContainer from '../containers/DiagramContainer.jsx';
import DataWindow from '../components/DataWindow.jsx';

const DashboardContainer = (props) => {
  const { loggedIn, setLoggedIn } = props;
  const [panelFullScreen, setPanelFullScreen] = useState(false);
  const [diagramFullScreen, setDiagramFullScreen] = useState(true);
  const [dataWindowFullScreen, setDataWindowFullScreen] = useState(false);


  const handlePanelClick = () => {
    if (panelFullScreen) {
      return;
    }
    setPanelFullScreen(!panelFullScreen);
    setDiagramFullScreen(false);
    setDataWindowFullScreen(false);
    console.log(panelFullScreen)
  };

  const handleDiagramClick = () => {
    if (diagramFullScreen) {
      return;
    }
    setPanelFullScreen(false);
    setDiagramFullScreen(!diagramFullScreen);
    setDataWindowFullScreen(false);
  };

  const handleDataClick = () => {
    if (dataWindowFullScreen) {
      return;
    }
    setPanelFullScreen(false);
    setDiagramFullScreen(false);
    setDataWindowFullScreen(!dataWindowFullScreen);
  };

  // if (!loggedIn) {
  //   return <Navigate to="/auth" />;
  // }
  
  return (
    <div id='dashboard-container'>

      <div id='dashboard-wrapper' className={dataWindowFullScreen ? 'collapse-screen' : 'full-screen'}>
        <Panel panelFullScreen={panelFullScreen} setPanelFullScreen={setPanelFullScreen} />
        <DiagramContainer diagramFullScreen={diagramFullScreen} setDiagramFullScreen={setDiagramFullScreen} />
      </div>

      <DataWindow dataWindowFullScreen={dataWindowFullScreen} setDataWindowFullScreen={setDataWindowFullScreen} />

      <div className='block-button-wrapper dashboard-buttons'>
        <button className='secondary-button' id='panelButton' onClick={handlePanelClick}>Panel</button>
        <button className='secondary-button' id='dataButton' onClick={handleDataClick}>Log</button>
        <button className='secondary-button' id='diagramButton' onClick={handleDiagramClick}>Map</button>
      </div>
    </div>
  );
};

export default DashboardContainer;

