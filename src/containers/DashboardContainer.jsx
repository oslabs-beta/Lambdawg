import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Panel from "../components/Panel.jsx";
import DiagramContainer from "../containers/DiagramContainer.jsx";
import DataWindow from "../components/DataWindow.jsx";

const DashboardContainer = (props) => {
  const { loggedIn, setLoggedIn, user } = props;
  const [panelFullScreen, setPanelFullScreen] = useState(false);
  const [diagramFullScreen, setDiagramFullScreen] = useState(true);
  const [dataWindowFullScreen, setDataWindowFullScreen] = useState(false);
  const [msNames, setMsNames] = useState([]);
  const [msMetrics, setMsMetrics] = useState({});
  const [msTraces, setMsTraces] = useState([]);
  const [msServiceIds, setMsServiceIds] = useState([]);

  //trying to pass down to charts
  // const [isPanelOpen, setIsPanelOpen] = useState(false);
  //need to keep track of which panel needs to be open based on which circle was clicked
  const [activePanel, setActivePanel] = useState("");

  const handleTogglePanel = (panelName) => {
    //here, panelName is the circle name passed up from bubble chart
    console.log("handletogglepanel", panelName);
    setActivePanel(panelName);
    console.log("current active panel", activePanel);
  };

  const handlePanelClick = () => {
    if (panelFullScreen) {
      return;
    }
    setPanelFullScreen(!panelFullScreen);
    setDiagramFullScreen(false);
    setDataWindowFullScreen(false);
    console.log(panelFullScreen);
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

  // fetch names
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch("http://localhost:3000/getLambdaNames", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          muteHttpExceptions: true,
        });
        const data = await response.json();
        setMsNames(data);
        console.log("names:", data);
      } catch (error) {
        console.log(error, "error fetching MsNames");
      }
    };
    fetchNames();
  }, []);

  // fetch metrics
  useEffect(() => {
    if (msNames) {
      const fetchMetrics = async () => {
        try {
          const response = await fetch("http://localhost:3000/getLambdaMetrics", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            muteHttpExceptions: true,
          });
          const data = await response.json();
          setMsMetrics(data.MetricDataResults);
          console.log("dashboard metrics: ", msMetrics);
        } catch (error) {
          console.log("error fetching metrics", error);
        }
      };
      fetchMetrics();
    }
  }, []);

  //fetch individual lambda trace data for latency graphs
  useEffect(() => {
    //we need names to fetch traces also
    const fetchTraces = async () => {
      console.log("in fetch traces");
      try {
        const response = await fetch("http://localhost:3000/getTraces", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
        console.log("dashboard traces useEffect: ", msTraces);
        console.log("servicedata array in dashboard", serviceData);
      } catch (error) {
        console.log("error fetching traces", error);
      }
    };
    fetchTraces();
    console.log("mstraces in fetch dashboard", msTraces);
  }, []);

  return (
    <div id="dashboard-container">
      <div id="dashboard-wrapper" className={dataWindowFullScreen ? "collapse-screen" : "full-screen"}>
        <Panel
          msNames={msNames}
          msMetrics={msMetrics}
          panelFullScreen={panelFullScreen}
          setPanelFullScreen={setPanelFullScreen}
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
      <DataWindow dataWindowFullScreen={dataWindowFullScreen} setDataWindowFullScreen={setDataWindowFullScreen} />

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
