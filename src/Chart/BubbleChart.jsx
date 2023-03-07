import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import BubbleChart from "@weknow/react-bubble-chart-d3";

const traceDataMock = [
  {
    Name: "cakerTwoFunction",
    Duration: 1.228,
    ResponseTime: 1.151,
    Invocations: 3,
  },
  {
    Name: "cakerFirstFunction",
    Duration: 3.141,
    ResponseTime: 3.043,
    Invocations: 4,
  },
  {
    Name: "cakerThreeFunction",
    Duration: 3.045,
    ResponseTime: 2.825,
    Invocations: 1,
  },
  {
    Name: "cakerFourFunction",
    Duration: 3.045,
    ResponseTime: 2.825,
    Invocations: 5,
  },
];

function Bubbles(props = traceDataMock) {
  const bubbleClick = (label) => {
    //show data window? or scroll down to logs
    console.log("Custom bubble click func");
  };
  const legendClick = (label) => {
    //we might not need legend really
    console.log("Customer legend click func");
  };

  const bubbleChartRef = useRef(null);
  const [bubbleMetrics, setbubbleMetrics] = useState([]);
  useEffect(() => {
    //this use effect needs to take invocations and function name from metrics
    //set in an array of obj like traceDataMock
    //generate array of objects that is rendered in the "data" attribute of the chart below
    if (!bubbleMetrics || !Array.isArray(bubbleMetrics)) return console.log("no bubble bubbles");
    console.log("ze bubbles", bubbleMetrics);

    //need to pull from props? For now, props = traceDataMock
    const bubbleData = traceDataMock.map((obj) => {
      return {
        label: obj.Name,
        value: obj.Invocations,
      };
    });
    //settting as mock data for now
    setbubbleMetrics(bubbleData);
    // console.log(traceDataMock);
  }, []);

  //this is supposed to allow bubble dragging but it is not working rn
  useEffect(() => {
    // Get the svg element and select all the bubbles
    const chartNode = bubbleChartRef.current.chartNode;
    const bubbles = d3.select(chartNode).selectAll(".bubble-chart__bubble");

    // Add drag behavior to the bubbles
    bubbles.call(
      d3
        .drag()
        .on("start", (event, d) => {
          d3.select(event.sourceEvent.target).classed("dragging", true);
        })
        .on("drag", (event, d) => {
          d3.select(event.sourceEvent.target).attr("transform", `translate(${event.x}, ${event.y})`);
        })
        .on("end", (event, d) => {
          d3.select(event.sourceEvent.target).classed("dragging", false);
        })
    );

    // Add click behavior to the bubbles
    bubbles.on("click", (event, d) => {
      console.log(`Clicked on bubble ${d.label}`);
    });
  }, [bubbleMetrics]);

  return (
    <div>
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
