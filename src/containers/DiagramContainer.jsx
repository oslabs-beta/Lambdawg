import React, { useState } from "react";
import HorizontalBarChart from "../Chart/BarChart2";
import BarChart from "../Chart/BarChart";
import Bubbles from "../Chart/BubbleChart";
const DiagramContainer = (props) => {
  const { diagramFullScreen, setDiagramFullScreen } = props;
  const { msNames, msMetrics, msTraces } = props;
  // window.addEventListener("message", receiveMessage, false);
  // function receiveMessage(event) {
  //   if (event.origin !== "http://localhost:5173") return;
  //   document.getElementById("testClick").textContent = event.data; // the node id
  // }

  return (
    <div id="diagram-container-wrapper" className={diagramFullScreen ? "full-screen" : "collapse-screen"}>
      <HorizontalBarChart msNames={msNames} msTraces={msTraces} />
      {/* <BarChart /> */}
      <Bubbles msMetrics={msMetrics} />
      {/* <iframe id='chart-frame' width='100%' src='/src/Chart/index.html' /> */}
    </div>
  );
};
export default DiagramContainer;
