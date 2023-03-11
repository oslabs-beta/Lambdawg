
import React, { useEffect, useState} from 'react';
import Panel from '../components/Panel.jsx';
import DiagramContainer from '../containers/DiagramContainer.jsx';
import DataWindow from '../components/DataWindow.jsx';


const DashboardContainer = (props) => {
  const { user, setUser } = props;
  const [panelFullScreen, setPanelFullScreen] = useState(false);
  const [diagramFullScreen, setDiagramFullScreen] = useState(true);
  const [dataWindowFullScreen, setDataWindowFullScreen] = useState(false);
  const [msNames, setMsNames] = useState([]);
  const [msMetrics, setMsMetrics] = useState({});
  const [msLogs, setMsLogs] = useState({});
  const [msTraces, setMsTraces] = useState([]);
  const [msServiceIds, setMsServiceIds] = useState([]);
  const [refreshRedis, setRefreshRedis] = useState(false);

  //need to keep track of which panel needs to be open based on which circle was clicked
  const [activePanel, setActivePanel] = useState("");

  const handleTogglePanel = (panelName) => {
    //here, panelName is the circle name passed up from bubble chart
    console.log("handletogglepanel", panelName);
    setActivePanel(panelName);
    console.log("current active panel", activePanel);
  };

  useEffect(() => {
    console.log("listening for arn in dashboard");
  }, [user]);

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
  useEffect(async() => { 
    const fetchNames = async() => {
      if (refreshRedis) setRefreshRedis(false);
        try{
          const response = await fetch('/aws/getLambdaNames', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              arn: user.arn,
              user_name: user.user_name
            }),
            muteHttpExceptions: true
          });
          if (response.ok){
            const data = await response.json()
            setMsNames(data);
            console.log('names in dashboard', msNames)
          }
          else {
            alert('Please confirm correct ARN and region in settings')
          }
        }
        catch(error){
          console.log(error, 'error fetching MsNames')
        }
      }; 
      fetchNames(); 
  }, [user, refreshRedis])

  // fetch metrics
  useEffect(async() => {
    if (msNames) {
      const fetchMetrics = async () => {
        try {
          const response = await fetch('/aws/getLambdaMetrics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              arn: user.arn,
              user_name: user.user_name
            }),
            muteHttpExceptions: true,
          });
          const data = await response.json();
          setMsMetrics(data.MetricDataResults);
          console.log('metrics in dash', msMetrics)
        } 
        catch (error) {
          console.log('error fetching metrics', error);
        }
      };
      fetchMetrics();
    }
  }, [msNames]);

  return (
    <div id="dashboard-container">
      <div id="dashboard-wrapper" className={dataWindowFullScreen ? "collapse-screen" : "full-screen"}>
        <Panel
          user={user}
          setUser={setUser}
          msNames={msNames}
          msMetrics={msMetrics}
          panelFullScreen={panelFullScreen}
          setPanelFullScreen={setPanelFullScreen}
          msLogs={msLogs}
          setMsLogs={setMsLogs}
          refreshRedis={refreshRedis}
          setRefreshRedis={setRefreshRedis}
        />
        <DiagramContainer
          msNames={msNames}
          msMetrics={msMetrics}
          msTraces={msTraces}
          msServiceIds={msServiceIds}
          diagramFullScreen={diagramFullScreen}
          setDiagramFullScreen={setDiagramFullScreen}
          handleTogglePanel={handleTogglePanel}
        />
      </div>

      <DataWindow
        dataWindowFullScreen={dataWindowFullScreen}
        setDataWindowFullScreen={setDataWindowFullScreen}
        msLogs={msLogs}
        setMsLogs={setMsLogs}
      />

      <div className="block-button-wrapper dashboard-buttons">
        <button className="secondary-button" id="panelButton" onClick={handlePanelClick}>
          Panel
        </button>
        <button className="secondary-button" id="dataButton" onClick={handleDataClick}>
          Log
        </button>
        <button className="secondary-button" id="diagramButton" onClick={handleDiagramClick}>
          Map
        </button>
      </div>
    </div>
  );
};

export default DashboardContainer;
