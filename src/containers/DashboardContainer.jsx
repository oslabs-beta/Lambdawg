
import React, { useEffect, useState} from 'react';
import { Navigate } from "react-router-dom";
import Panel from '../components/Panel.jsx';
import DiagramContainer from '../containers/DiagramContainer.jsx';
import DataWindow from '../components/DataWindow.jsx';

const DashboardContainer = (props) => {
  const { loggedIn, setLoggedIn, user } = props;
  const [panelFullScreen, setPanelFullScreen] = useState(false);
  const [diagramFullScreen, setDiagramFullScreen] = useState(true);
  const [dataWindowFullScreen, setDataWindowFullScreen] = useState(false);
  const [msNames, setMsNames] = useState([]);
  const [msMetrics, setMsMetrics] = useState({});
  const [msLogs, setMsLogs] = useState({})

  useEffect(()=>{ console.log('listening for arn in dashboard') }, [user])

  /// toggle full screen for mobile
  const handlePanelClick = () => {
    if (panelFullScreen) {
      return;
    }
    setPanelFullScreen(!panelFullScreen);
    setDiagramFullScreen(false);
    setDataWindowFullScreen(false);
    document.getElementById("panelButton").classList.add("current-window-button");
    document.getElementById("diagramButton").classList.remove("current-window-button");
    document.getElementById("dataButton").classList.remove("current-window-button");
  };

  const handleDiagramClick = () => {
    if (diagramFullScreen) {
      return;
    }
    setPanelFullScreen(false);
    setDiagramFullScreen(!diagramFullScreen);
    setDataWindowFullScreen(false);
    document.getElementById("diagramButton").classList.add("current-window-button");
    document.getElementById("panelButton").classList.remove("current-window-button");
    document.getElementById("dataButton").classList.remove("current-window-button");
  };

  const handleDataClick = () => {
    if (dataWindowFullScreen) {
      return;
    }
    setPanelFullScreen(false);
    setDiagramFullScreen(false);
    setDataWindowFullScreen(!dataWindowFullScreen);
    document.getElementById("dataButton").classList.add("current-window-button");
    document.getElementById("diagramButton").classList.remove("current-window-button");
    document.getElementById("panelButton").classList.remove("current-window-button");
 
  };

// fetch names
useEffect(() => { 
  const fetchNames = async() => {
      try{
        const response = await fetch('/aws/getLambdaNames', {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            arn: user.arn
          }),
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
}, [user])

// fetch metrics
useEffect(() => {
  if (msNames) {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:3000/getLambdaMetrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            arn: user.arn
          }),
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
        <Panel user={user} msNames={msNames} msMetrics={msMetrics} panelFullScreen={panelFullScreen} setPanelFullScreen={setPanelFullScreen} msLogs={msLogs} setMsLogs={setMsLogs}/>
        <DiagramContainer diagramFullScreen={diagramFullScreen} setDiagramFullScreen={setDiagramFullScreen} />
      </div>

      <DataWindow dataWindowFullScreen={dataWindowFullScreen} setDataWindowFullScreen={setDataWindowFullScreen} msLogs={msLogs} setMsLogs={setMsLogs}/>

      <div className='block-button-wrapper dashboard-buttons'>
        <button className='secondary-button' id='panelButton' onClick={handlePanelClick}>Panel</button>
        <button className='secondary-button' id='dataButton' onClick={handleDataClick}>Log</button>
        <button className='secondary-button' id='diagramButton' onClick={handleDiagramClick}>Map</button>
      </div>
      
    </div>
  );
};

export default DashboardContainer;

