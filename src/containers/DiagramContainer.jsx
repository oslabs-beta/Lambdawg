import React, { useState } from "react";
import HorizontalBarChart from "../Chart/BarChart";
import CircleChart from "../Chart/CircleChart";
import Dropdown from "../components/ChartDropDown";

const DiagramContainer = (props) => {
  const { diagramFullScreen, setDiagramFullScreen } = props;
  const { msNames, msMetrics, msTraces, msServiceIds, handleTogglePanel } = props;
  const [activeChart, setActiveChart] = useState('Node');

  // console.log("diagram container mstraces n metrics n serviceids", msTraces, msMetrics, msServiceIds);

  window.addEventListener("message", receiveMessage, false);
    function receiveMessage(event) {
      // if (event.origin !== "../src/Chart/index.html") return;
      // The incoming message will be refered to as 'event.data'
      console.log('event.data', event.data)
      const funcButtonId = event.data;
      const funcButton = document.getElementById(funcButtonId)
      funcButton.click();
  }

  // console.log("current active chart", activeChart);

  return (
    <div>
      <Dropdown setActiveChart={setActiveChart} />
      <div id="diagram-container-wrapper" className={diagramFullScreen ? "full-screen" : "collapse-screen"}>
        {activeChart === "Bar" && <HorizontalBarChart msNames={msNames} msTraces={msTraces} />}
        {activeChart === "Bubble" && <CircleChart msMetrics={msMetrics} handleTogglePanel={handleTogglePanel} />}
        {activeChart === "Node" && <iframe id="chart-frame" width="100%" src="/src/Chart/index.html" />}
      </div>
    </div>
  );
};
export default DiagramContainer;
