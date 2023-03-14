import React, { useRef, useEffect, useState } from "react";
import BubbleChart from "./BubbleChart";

//this is the parent element that renders the bubble chart. Circle -> BubbleChart -> CircleChart
const CircleChart = (props) => {
  const { msMetrics, handleTogglePanel } = props;
  const [bubbleChartData, setBubbleChartData] = useState([]);
  //fetch metrics to render in chart
  useEffect(() => {
    if (!msMetrics || !Array.isArray(msMetrics)) return console.log("no metrics data");

    function bubbleDataParse(metricsArr) {
      const bubbleArray = [];

      //parse metrics string from aws-sdk
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
    //parsing label and value. Data structure of d3 data: [{name: blah, count: blah}]
    const graphData = bubbleData.map((obj) => {
      return { name: obj.name, count: obj.invocations };
    });
    setBubbleChartData(graphData);
  }, []);

  const width = window.screen.width / 1;
  const height = window.screen.height / 1;
  //setting some styles here to overwrite predefined styles from d3 chart
  return (
    <div
      className="bubbleChart charts"
      style={{ width: width, height: height, margin: "0 auto", background: "$theme-color-1" }}
    >
      <BubbleChart bubbleChartData={bubbleChartData} handleTogglePanel={handleTogglePanel} />
    </div>
  );
};

export default CircleChart;
