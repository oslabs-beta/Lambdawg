import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import miserables from "./miserables.json";

const NodeChart = (props) => {
  const styles = {
    body: {
      margin: "0px",
      padding: "0px",
    },
    links: {
      stroke: "#b8b2b2",
      strokeWidth: "3px",
    },
    nodes: {
      pointerEvents: "all",
      stroke: "#5bfba3",
      strokeWidth: "10px",
    },
    outline: {
      position: "absolute",
      top: "00px",
      right: "0px",
      width: "99%",
      height: "99%",
    },
    svg: {
      width: "100%",
      height: "100%",
    },
  };

  const svgRef = useRef(null);
  console.log("in node chart");
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(function (d) {
            return d.id;
          })
          .distance(100)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(50).strength(0.5));

    const container = d3.select(svgRef.current.parentNode);

    const zoom = d3.zoom().scaleExtent([0.5, 10]).on("zoom", zoomed);

    container.call(zoom);

    function zoomed() {
      svg.attr("transform", d3.event.transform);
    }

    const graph = miserables;

    const link = svg.append("g").attr("class", "links").selectAll("line").data(graph.links).enter().append("line");

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("r", 10.5)
      .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

    node.append("title").text(function (d) {
      return d.id;
    });
    node.on("click", function (d) {
      console.log(d3.select(this).select("title").text());
      // alert('clicked')
      // parent.postMessage(d.id , "http://localhost:5173/index.html");
    });

    simulation.nodes(graph.nodes).on("tick", ticked);

    simulation.force("link").links(graph.links);

    function ticked() {
      link
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      node
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, []);

  return (
    <div id="container">
      <svg viewBox="0 0 960 650" width="960" height="650" className="outline" ref={svgRef} style={styles.svg}></svg>
    </div>
  );
};
export default NodeChart;
