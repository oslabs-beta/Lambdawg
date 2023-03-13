import React, { useEffect, useState } from "react";
import HorizontalBarChart from "../Chart/BarChart";
import CircleChart from "../Chart/CircleChart";
import Dropdown from "../components/ChartDropDown";

const DiagramContainer = (props) => {
  const { diagramFullScreen } = props;
  const { msNames, msMetrics, msTraces, msServiceIds, handleTogglePanel } = props;
  const [activeChart, setActiveChart] = useState("Node");

  //writing serviceIds to the JSON file so the D3 node chart can read it
  useEffect(() => {
    if (msServiceIds.length) {
      const writeToFile = async (services) => {
        try {
          const response = await fetch("/aws/writeToFile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              serviceIds: msServiceIds,
            }),
            muteHttpExceptions: true,
          });
          if (response.ok) {
            const data = await response.json();
          }
        } catch (error) {
          console.log(error, "error posting service data");
        }
      };
      writeToFile(msServiceIds);
    }
  }, []);

  //When a node is clicked in the iframe, the message will be sent back
  window.addEventListener("message", async (event) => {
    if (event.origin !== "http://localhost:5173") return;

    const serviceNodeId = event.data;
    if (!serviceNodeId.id) return;

    let nodeId = serviceNodeId.id;

    nodeId = nodeId.slice(0, nodeId.length - 1);
    let button = await document.getElementById(nodeId);
    if (button) {
      button.click();
    } else {
      console.log("was the button clicked? noooo");
    }
  });

  // active chart updates from dropdown, and renders corresponding chart
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
