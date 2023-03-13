import React, { useEffect, useState } from 'react';
import Panel from '../components/Panel.jsx';
import DiagramContainer from '../containers/DiagramContainer.jsx';
import DataWindow from '../components/DataWindow.jsx';

const DashboardContainer = (props) => {
  const { user } = props;
  const [panelFullScreen, setPanelFullScreen] = useState(false);
  const [diagramFullScreen, setDiagramFullScreen] = useState(true);
  const [dataWindowFullScreen, setDataWindowFullScreen] = useState(false);
  const [msNames, setMsNames] = useState([]);
  const [msMetrics, setMsMetrics] = useState({});
  const [msLogs, setMsLogs] = useState({});
  const [msTraces, setMsTraces] = useState([]);
  const [msServiceIds, setMsServiceIds] = useState([]);

  //need to keep track of which panel needs to be open based on which circle was clicked
  const [activePanel, setActivePanel] = useState('');

  const handleTogglePanel = (panelName) => {
    //panelName is the name of the bubble that was clicked. Passed back up from bubble chart
    setActivePanel(panelName);
    //now we can use the panelName id to select the corresponding button in the panel

    if (panelName) {
      const button = document.getElementById(panelName);
      button.click();
    }
  };

  useEffect(() => {
    console.log('listening for arn in dashboard');
  }, [user]);

  /// toggle full screen for mobile
  const handlePanelClick = () => {
    if (panelFullScreen) {
      return;
    }
    setPanelFullScreen(!panelFullScreen);
    setDiagramFullScreen(false);
    setDataWindowFullScreen(false);
    document
      .getElementById('panelButton')
      .classList.add('current-window-button');
    document
      .getElementById('diagramButton')
      .classList.remove('current-window-button');
    document
      .getElementById('dataButton')
      .classList.remove('current-window-button');
  };

  const handleDiagramClick = () => {
    if (diagramFullScreen) {
      return;
    }
    setPanelFullScreen(false);
    setDiagramFullScreen(!diagramFullScreen);
    setDataWindowFullScreen(false);
    document
      .getElementById('diagramButton')
      .classList.add('current-window-button');
    document
      .getElementById('panelButton')
      .classList.remove('current-window-button');
    document
      .getElementById('dataButton')
      .classList.remove('current-window-button');
  };

  const handleDataClick = () => {
    if (dataWindowFullScreen) {
      return;
    }
    setPanelFullScreen(false);
    setDiagramFullScreen(false);
    setDataWindowFullScreen(!dataWindowFullScreen);
    document
      .getElementById('dataButton')
      .classList.add('current-window-button');
    document
      .getElementById('diagramButton')
      .classList.remove('current-window-button');
    document
      .getElementById('panelButton')
      .classList.remove('current-window-button');
  };

  // fetch names
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('/aws/getLambdaNames', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            arn: user.arn,
          }),
          muteHttpExceptions: true,
        });
        if (response.ok) {
          const data = await response.json();
          setMsNames(data);
        } else {
          alert('Please confirm correct ARN and region in settings');
        }
      } catch (error) {
        console.log(error, 'error fetching MsNames');
      }
    };
    fetchNames();
  }, [user]);

  // fetch metrics
  useEffect(() => {
    if (msNames) {
      const fetchMetrics = async () => {
        try {
          const response = await fetch('/aws/getLambdaMetrics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              arn: user.arn,
            }),
            muteHttpExceptions: true,
          });
          const data = await response.json();
          setMsMetrics(data.MetricDataResults);
        } catch (error) {
          console.log('error fetching metrics', error);
        }
      };
      fetchMetrics();
    }
  }, [msNames]);

  //fetch trace data
  useEffect(() => {
    //we need names to fetch traces also
    const fetchTraces = async () => {
      console.log('in fetch traces');
      try {
        const response = await fetch('/aws/getTraces', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            arn: user.arn,
          }),
          muteHttpExceptions: true,
        });
        const data = await response.json();

        //parsing name, duration, responseTime, service ids
        const serviceData = [];
        const traceData = await data.map((obj) => {
          if (!obj.summary.length) {
            return {
              name: obj.name,
              duration: undefined,
              responseTime: undefined,
              serviceIds: undefined,
            };
          } else {
            //create a separate serviceData array to pass as msServiceIds
            serviceData.push({
              name: obj.name,
              serviceIds: obj.summary[0].ServiceIds,
            });
            return {
              name: obj.name,
              duration: obj.summary[0].Duration,
              responseTime: obj.summary[0].ResponseTime,
              serviceIds: obj.summary[0].ServiceIds,
            };
          }
        });
        //trying to parse serviceIdData all at once
        setMsTraces(traceData);
        setMsServiceIds(serviceData);
        console.log('dashboard traces useEffect: ', msTraces);
        console.log('servicedata array in dashboard', serviceData);
      } catch (error) {
        console.log('error fetching traces', error);
      }
    };
    fetchTraces();
    console.log('mstraces in fetch dashboard', msTraces);
  }, []);
  return (
    <div id='dashboard-container'>
      <div
        id='dashboard-wrapper'
        className={dataWindowFullScreen ? 'collapse-screen' : 'full-screen'}
      >
        <Panel
          user={user}
          msNames={msNames}
          msMetrics={msMetrics}
          panelFullScreen={panelFullScreen}
          setPanelFullScreen={setPanelFullScreen}
          msLogs={msLogs}
          setMsLogs={setMsLogs}
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

      <div className='block-button-wrapper dashboard-buttons'>
        <button
          className='secondary-button'
          id='panelButton'
          onClick={handlePanelClick}
        >
          Panel
        </button>
        <button
          className='secondary-button'
          id='dataButton'
          onClick={handleDataClick}
        >
          Log
        </button>
        <button
          className='secondary-button'
          id='diagramButton'
          onClick={handleDiagramClick}
        >
          Map
        </button>
      </div>
    </div>
  );
};

export default DashboardContainer;
