import React, { useRef, useEffect, useState } from "react";
// import * as d3 from "d3";
import BubbleChart from "./BubbleChart";

const CircleChart = (props) => {
  const { msMetrics, handleTogglePanel } = props;
  const [bubbleChartData, setBubbleChartData] = useState([]);
  useEffect(() => {
    if (!msMetrics || !Array.isArray(msMetrics)) return console.log("no bubble bubbles");
    console.log("ze bubbles", msMetrics);
    console.log("charts props", props);

    function bubbleDataParse(metricsArr) {
      const bubbleArray = [];

      metricsArr.forEach((obj, i) => {
        const functionName = obj.Label.split(" ")[0];
        const type = obj.Label.split(" ")[1];
        const invocations = obj.Values.reduce((sum, value) => sum + value, 0);

        const result = {
          name: functionName,
          type: type,
          invocations: invocations,
        };
        if (type === "Invocations") {
          bubbleArray.push(result);
        }
      });
      return bubbleArray;
    }

    const bubbleData = bubbleDataParse(msMetrics);
    console.log("bubbleData before parse", bubbleData);
    //now parse just the label and value since that is the structure of data the bubble chart takes [{name: blah, count: blah}]
    const graphData = bubbleData.map((obj) => {
      return { name: obj.name, count: obj.invocations };
    });
    setBubbleChartData(graphData);
    console.log("bubble graph Data", graphData, bubbleChartData);

    //now parse
  }, []);

  const width = window.screen.width / 2;
  const height = window.screen.height;

  return (
    <div className="charts" style={{ width: width, margin: "0 auto" }}>
      <div className="bubbleChart" style={{ background: "$theme-color-1" }}>
        <BubbleChart bubbleChartData={bubbleChartData} handleTogglePanel={handleTogglePanel} />
      </div>
    </div>
  );
};

export default CircleChart;
