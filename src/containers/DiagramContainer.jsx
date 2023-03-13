import React, { useEffect, useState } from "react";
import HorizontalBarChart from "../Chart/BarChart";
import CircleChart from "../Chart/CircleChart";
import Dropdown from "../components/ChartDropDown";
// import parseService from "../Chart/ServiceParser";

const DiagramContainer = (props) => {
  const { diagramFullScreen, setDiagramFullScreen } = props;
  const [serviceIds, setServiceIds] = useState([]);
  const { msNames, msMetrics, msTraces, msServiceIds, handleTogglePanel } = props;
  console.log("diagram container mstraces n metrics n serviceids", msTraces, msMetrics, msServiceIds);
  // console.log("diagram container props", props);

  //writing serviceIds to the JSON file so the D3 node chart can read it
  useEffect(() => {
    if (msServiceIds.length) {
      setServiceIds(msServiceIds);
      console.log("serviceids in useEffect", serviceIds);
      const writeToFile = async () => {
        try {
          const response = await fetch("/aws/writeToFile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              serviceIds: serviceIds,
            }),
            muteHttpExceptions: true,
          });
          if (response.ok) {
            const data = await response.json();
            console.log("data written to JSON", data);
          } else {
            alert("Error writing service data to JSON file");
          }
        } catch (error) {
          console.log(error, "error posting service data");
        }
      };
      writeToFile();
    }
  }, []);

  // window.addEventListener("message", receiveMessage, false);
  // function receiveMessage(event) {
  //   if (event.origin !== "http://localhost:5173") return;

  //   const serviceNodeId = event.data;
  //   let nodeId = serviceNodeId.id;
  //   nodeId = nodeId.slice(0, nodeId.length - 1);
  //   console.log("nodeId", nodeId);
  //   let button = document.getElementById(nodeId);
  //   console.log(button);
  //   // document.getElementById().textContent = event.data; // the node id
  // }

  window.addEventListener("message", async (event) => {
    if (event.origin !== "http://localhost:5173") return;

    const serviceNodeId = event.data;
    if (!serviceNodeId.id) return;

    let nodeId = serviceNodeId.id;
    nodeId = nodeId.slice(0, nodeId.length - 1);
    console.log("nodeId", nodeId);

    let button = await document.getElementById(nodeId);
    console.log(button);

    if (button) {
      button.click();
    } else {
      console.log("was the button clicked? noooo");
    }
  });

  //this useState provides diagramContainer which chart was selected
  const [activeChart, setActiveChart] = useState("Node");
  console.log("current active chart", activeChart);

  return (
    <div id="diagram-container-wrapper" className={diagramFullScreen ? "full-screen" : "collapse-screen"}>
      {activeChart === "Bar" && <HorizontalBarChart msNames={msNames} msTraces={msTraces} />}
      {activeChart === "Bubble" && <CircleChart msMetrics={msMetrics} handleTogglePanel={handleTogglePanel} />}
      {activeChart === "Node" && <iframe id="chart-frame" width="100%" height="100%" src="/src/Chart/index.html" />}
      <Dropdown setActiveChart={setActiveChart} />
    </div>
  );
};
export default DiagramContainer;
