import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import BubbleChart from "@weknow/react-bubble-chart-d3";

function Bubbles(props) {
  const { msMetrics } = props;
  console.log("in bubble chart", msMetrics);
  //just sort msMetrics for invocation #

  const bubbleClick = (label) => {
    //show data window? or scroll down to logs
    console.log("Custom bubble click func");
  };
  const legendClick = (label) => {
    //we might not need legend really
    console.log("Customer legend click func");
  };

  //bubbleChartRef - to give drag feature
  const bubbleChartRef = useRef(null);
  const [bubbleMetrics, setbubbleMetrics] = useState([]);

  useEffect(() => {
    if (!msMetrics || !Array.isArray(msMetrics)) return console.log("no bubble bubbles");
    console.log("ze bubbles", msMetrics);

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
        if (result.type === "Invocations") {
          bubbleArray.push(result);
        }
      });
      return bubbleArray;
    }

    const bubbleData = bubbleDataParse(msMetrics);
    //now parse just the label and value since that is the structure of data the bubble chart takes [{label: blah, value: blah}]
    const graphData = bubbleData.map((obj) => {
      return { label: obj.name, value: obj.invocations };
    });
    setbubbleMetrics(graphData);
    console.log("bubble graph Data", graphData);

    //now parse
  }, []);

  function handleDrag(event, d, width = 800, height = 700) {
    const node = d3.select(this);

    // get the radius of the bubble
    const radius = parseFloat(node.attr("r"));

    // get the current x,y position of the circle
    let currentX = parseFloat(node.attr("cx"));
    let currentY = parseFloat(node.attr("cy"));

    // calculate the new x,y position of the circle based on the mouse position
    let newX = event.x;
    let newY = event.y;

    // limit the new x,y position of the circle to stay within the bounds of the SVG element
    newX = Math.max(radius, Math.min(newX, width - radius));
    newY = Math.max(radius, Math.min(newY, height - radius));

    // set the cx and cy attributes of the circle to the new position
    node.attr("cx", newX).attr("cy", newY);
  }

  useEffect(() => {
    // Get the svg element and select all the bubbles
    const bubbles = d3.selectAll("circle");
    const dragHandler = d3
      .drag()
      .on("start", function () {
        d3.select(this).raise().classed("active", true);
      })
      .on("drag", handleDrag)
      .on("end", function () {
        d3.select(this).classed("active", false);
      });

    bubbles.call(dragHandler);
    // Add click behavior to the bubbles
    // bubbles.on("click", (event, d) => {
    //   console.log(`Clicked on bubble ${d.label}`);
    // });
  }, [bubbleMetrics]);

  return (
    <div id="bubble-chart">
      <BubbleChart
        ref={bubbleChartRef}
        graph={{
          zoom: 0.9,
        }}
        width={800}
        height={700}
        padding={0} // optional value, number that set the padding between bubbles
        showLegend={true} // optional value, pass false to disable the legend.
        legendPercentage={20} // number that represent the % of with that legend going to use.
        legendFont={{
          family: "Arial",
          size: 12,
          color: "#000",
          weight: "bold",
        }}
        valueFont={{
          family: "Arial",
          size: 12,
          color: "#fff",
          weight: "bold",
        }}
        labelFont={{
          family: "Arial",
          size: 16,
          color: "#fff",
          weight: "bold",
        }}
        bubbleProps={{
          fill: (d) => d.color,
          r: 30, //radius... to set each bubble the same size
          strokeWidth: 2,
        }}
        //Custom bubble/legend click functions such as searching using the label, redirecting to another page, popup window, etc
        bubbleClickFunc={bubbleClick}
        legendClickFunc={legendClick}
        data={bubbleMetrics}
      />
    </div>
  );
}

export default Bubbles;

//example micro metrics array
// [{Id: 'invocations0', Label: 'cakerFiveFunction Invocations', Timestamps: Array(0), Values: Array(0), StatusCode: 'Complete'}
// {Id: 'errors0', Label: 'cakerFiveFunction Errors', Timestamps: Array(0), Values: Array(0), StatusCode: 'Complete'}]
// const traceDataMock = [
//   {
//     Name: "cakerTwoFunction",
//     Duration: 1.228,
//     ResponseTime: 1.151,
//     Invocations: 3,
//   },
//   {
//     Name: "cakerFirstFunction",
//     Duration: 3.141,
//     ResponseTime: 3.043,
//     Invocations: 4,
//   },
//   {
//     Name: "cakerThreeFunction",
//     Duration: 3.045,
//     ResponseTime: 2.825,
//     Invocations: 1,
//   },
//   {
//     Name: "cakerFourFunction",
//     Duration: 3.045,
//     ResponseTime: 2.825,
//     Invocations: 5,
//   },
// ];
