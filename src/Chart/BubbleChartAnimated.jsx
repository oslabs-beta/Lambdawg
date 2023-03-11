import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
/********************* BubbleChart start ***************************/

//function to render each bubble in the bubble chart
function Circle({ data, onClick }) {
  const maxRadius = d3.max(data, (d) => d.count);
  const minRadius = d3.min(data, (d) => d.count);
  const radiusScale = d3.scaleSqrt().domain([minRadius, maxRadius]).range([20, 120]);

  return data.map((circle, index) => (
    <g key={index}>
      <circle
        // key={index}
        className="bubble"
        fill={`hsla(${circle.count},100%,70%,0.5)`}
        strokeWidth="1px"
        stroke={`hsla(${circle.count},100%,70%,0.8)`}
        r={radiusScale(circle.count)}
        cx={circle.x}
        cy={circle.y}
        onMouseMove={(e) => {
          d3.select(".bubbleChartTooltip")
            .style("visibility", "visible")
            .text(circle.name + " (" + circle.count + ")")
            .attr("x", e.nativeEvent.offsetX + 10 + "px")
            .attr("y", e.nativeEvent.offsetY - 10 + "px");
        }}
        onMouseOut={() => {
          d3.select(".bubbleChartTooltip").style("visibility", "hidden");
        }}
        onClick={() => onClick(circle)}
      />
      <text className="bubbleLabel" x={circle.x} y={circle.y} dy="0.3em" textAnchor="middle" fontSize="12" fill="#000">
        {circle.name + " (" + circle.count + ")"}
      </text>
    </g>
  ));
}

function BubbleChart({ bubbleChartData, handleTogglePanel }) {
  const [state, setState] = useState({ bubbleChartData: [] });
  // console.log("bubblechart togglepanel", togglePanel);
  useEffect(() => {
    setState({ bubbleChartData });
    simulation(bubbleChartData);
  }, [bubbleChartData]);

  function simulation(bubbleChartData) {
    const maxRadius = d3.max(bubbleChartData, (d) => d.count);
    const minRadius = d3.min(bubbleChartData, (d) => d.count);
    const radiusScale = d3.scaleSqrt().domain([minRadius, maxRadius]).range([20, 120]);

    const ticked = () => setState({ bubbleChartData });

    d3.forceSimulation()
      .nodes(bubbleChartData)
      .force("xTowardsTheCenter", d3.forceX(0).strength(0.01))
      .force("yTowardsTheCenter", d3.forceY(100).strength(0.01))
      .force(
        "collide",
        d3
          .forceCollide((d) => radiusScale(d.count))
          .strength(2)
          .iterations(1)
      )
      .on("tick", ticked);
  }

  const handleCircleClick = (circle) => {
    console.log(`You clicked on ${circle.name} with invocations: ${circle.count}`);
    //how to id panel button and make it show - need to pass up function name
    // togglePanel(circle.name);
    //this is supposed to send the name of the circle clicked to dashboard to populate active panel
    console.log("passing " + circle.name + "to dashboard");
    handleTogglePanel(circle.name);
  };

  const margins = { top: 20, right: 50, bottom: 20, left: 50 };
  const svgDimensions = { width: window.screen.width / 2, height: window.screen.height / 2 };

  return (
    <svg width={svgDimensions.width} height={svgDimensions.height}>
      <g
        className="bubbleChartGroup"
        transform={`translate(${svgDimensions.width / 2},${svgDimensions.height / 2 - 50})`}
      >
        <Circle data={state.bubbleChartData} onClick={handleCircleClick} />
      </g>
      <text fill="#fff" fontSize="14" className="bubbleChartTooltip" style={{ visibility: "hidden" }}>
        tooltip
      </text>
    </svg>
  );
}

/********************* BubbleChart end ***************************/

const Charts = (props) => {
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

export default Charts;
