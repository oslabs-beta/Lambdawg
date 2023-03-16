import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

//function to render each bubble in the bubble chart
function Circle({ data, onClick }) {
  const maxRadius = d3.max(data, (d) => d.count);
  const minRadius = d3.min(data, (d) => d.count);
  const radiusScale = d3.scaleSqrt().domain([minRadius, maxRadius]).range([20, 120]);

  //returns each circle with properties to render on bubble chart
  return data.map((circle, index) => (
    <g key={index}>
      <circle
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
      <text
        className="bubbleLabel charts"
        x={circle.x}
        y={circle.y}
        dy="0.3em"
        textAnchor="middle"
        fontSize="12"
        fill="#000"
      >
        {circle.name + " (" + circle.count + ")"}
      </text>
    </g>
  ));
}

export default Circle;
