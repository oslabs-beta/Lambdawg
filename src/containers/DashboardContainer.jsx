
import React, { useEffect, useState} from 'react';
import { Navigate } from "react-router-dom";
import Panel from '../components/Panel.jsx';
import DiagramContainer from '../containers/DiagramContainer.jsx';
import DataWindow from '../components/DataWindow.jsx';

const DashboardContainer = (props) => {
  const { loggedIn, setLoggedIn } = props;
  const [panelFullScreen, setPanelFullScreen] = useState(false);
  const [diagramFullScreen, setDiagramFullScreen] = useState(true);
  const [dataWindowFullScreen, setDataWindowFullScreen] = useState(false);
  const [msNames, setMsNames] = useState([]);
  const [msMetrics, setMsMetrics] = useState({});

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
  


useEffect(() => { 
  const fetchNames = async() => {
    try{
      const response = await fetch('http://localhost:3000/getLambdaNames', {
        method: 'GET', 
        headers: {'Content-Type': 'application/json'},
        muteHttpExceptions: true
      });
      const data = await response.json()
      setMsNames(data);
      console.log('names:', data)
    }
    catch(error){
      console.log(error, 'error fetching MsNames')
    }
  }; 
  fetchNames(); 
}, [])


useEffect(() => {
  if (msNames) {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:3000/getLambdaMetrics', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          muteHttpExceptions: true,
        });
        const data = await response.json();
        setMsMetrics(data.MetricDataResults);
        console.log('dashboard metrics: ', msMetrics);
      } catch (error) {
        console.log('error fetching metrics', error);
      }
    };
    fetchMetrics();
  }
}, []);



  return (
    <div id='dashboard-container'>

      <div id='dashboard-wrapper' className={dataWindowFullScreen ? 'collapse-screen' : 'full-screen'}>
        <Panel msNames={msNames} msMetrics={msMetrics} panelFullScreen={panelFullScreen} setPanelFullScreen={setPanelFullScreen} />
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

