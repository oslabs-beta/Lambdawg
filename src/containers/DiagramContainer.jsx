import React, { useState } from "react";
import HorizontalBarChart from "../Chart/BarChart";
import CircleChart from "../Chart/CircleChart";

const DiagramContainer = (props) => {
  const { diagramFullScreen, setDiagramFullScreen } = props;
  const { msNames, msMetrics, msTraces, msServiceIds, handleTogglePanel } = props;
  // console.log("diagram container mstraces n metrics n serviceids", msTraces, msMetrics, msServiceIds);
  // console.log("diagram container props", props);

  // window.addEventListener("message", receiveMessage, false);
  // function receiveMessage(event) {
  //   if (event.origin !== "http://localhost:5173") return;
  //   document.getElementById("testClick").textContent = event.data; // the node id
  // }

  return (
    <div id="diagram-container-wrapper" className={diagramFullScreen ? "full-screen" : "collapse-screen"}>
      {/* <HorizontalBarChart msNames={msNames} msTraces={msTraces} /> */}
      <CircleChart msMetrics={msMetrics} handleTogglePanel={handleTogglePanel} />
      <iframe id="chart-frame" width="100%" src="/src/Chart/index.html" />
    </div>
  );
};
export default DiagramContainer;
