import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import Circle from "./Circle";

function BubbleChart({ bubbleChartData, handleTogglePanel }) {
  const [state, setState] = useState({ bubbleChartData: [] });
  useEffect(() => {
    if (!bubbleChartData.length) console.log("No data yet, please wait");
    setState({ bubbleChartData });
    simulation(bubbleChartData);
  }, [bubbleChartData]);

  //sets size and relative radius of bubbles in chart
  function simulation(bubbleChartData) {
    const maxRadius = d3.max(bubbleChartData, (d) => d.count);
    const minRadius = d3.min(bubbleChartData, (d) => d.count);
    const radiusScale = d3.scaleSqrt().domain([minRadius, maxRadius]).range([10, 110]);

    const ticked = () => setState({ bubbleChartData });
    //this force chart animates bubbles to flow toward the middle
    d3.forceSimulation()
      .nodes(bubbleChartData)
      .force("xTowardsTheCenter", d3.forceX(0).strength(0.01))
      .force("yTowardsTheCenter", d3.forceY(100).strength(0.01))
      .force(
        "collide",
        d3
          .forceCollide((d) => radiusScale(d.count))
          .strength(1.5)
          .iterations(1)
      )
      .on("tick", ticked);
  }

  //passes the name (circle id) of the bubble selected back to dashboard to select corresponding panel
  const handleCircleClick = (circle) => {
    handleTogglePanel(circle.name);
  };

  //d3 chart boilerplate sizing
  const margins = { top: 20, right: 50, bottom: 20, left: 50 };
  const svgDimensions = { width: window.screen.width, height: window.screen.height / 2 };

  return (
    <svg width={window.screen.width} height={svgDimensions.height} margin={margins}>
      <g
        className="bubbleChartGroup charts"
        transform={`translate(${svgDimensions.width / 2},${svgDimensions.height / 2 - 100})`}
      >
        <Circle data={state.bubbleChartData} onClick={handleCircleClick} />
      </g>
      <text fill="#fff" fontSize="14" className="bubbleChartTooltip" style={{ visibility: "hidden" }}>
        tooltip
      </text>
    </svg>
  );
}

export default BubbleChart;
