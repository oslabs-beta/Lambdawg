import React, { useEffect, useState } from "react";
import HorizontalBarChart from "../Chart/BarChart";
import CircleChart from "../Chart/CircleChart";
import Dropdown from "../components/ChartDropDown";
import parseService from "../Chart/ServiceParser";

const DiagramContainer = (props) => {
  const { diagramFullScreen, setDiagramFullScreen } = props;
  const { msNames, msMetrics, msTraces, msServiceIds, handleTogglePanel } = props;
  console.log("diagram container mstraces n metrics n serviceids", msTraces, msMetrics, msServiceIds);
  // console.log("diagram container props", props);

  const msServiceIdsExample = [
    {
      name: "cakerSixFunction",
      serviceIds: [
        {
          Name: "cakerSixFunction",
          Names: ["cakerSixFunction"],
          Type: "client",
        },
        {
          Name: "cakerSixFunction",
          Names: ["cakerSixFunction"],
          Type: "AWS::Lambda",
        },
        {
          AccountId: "498545057811",
          Name: "cakerSixFunction",
          Names: ["cakerSixFunction"],
          Type: "AWS::Lambda::Function",
        },
      ],
    },
    {
      name: "cakerFiveFunction",
      serviceIds: [
        {
          Name: "cakerFiveFunction",
          Names: ["cakerSixFunction"],
          Type: "client",
        },
        {
          Name: "cakerFiveFunction",
          Names: ["cakerSixFunction"],
          Type: "AWS::Lambda",
        },
        {
          AccountId: "498545057811",
          Name: "cakerFiveFunction",
          Names: ["cakerSixFunction"],
          Type: "AWS::Lambda::Function",
        },
      ],
    },
  ];

  useEffect(() => {
    if (msServiceIds) {
      //will have to send msServiceIds to this
      console.log("msServiceId", msServiceIds);
      // parseService(msServiceIdsExample);
    }
  }, []);

  window.addEventListener("message", receiveMessage, false);
  function receiveMessage(event) {
    if (event.origin !== "http://localhost:5173") return;

    const serviceNodeId = event.data;
    let nodeId = serviceNodeId.id;
    nodeId = nodeId.substring(0, nodeId.length - 1);
    console.log("nodeId", nodeId);
    let button = document.getElementById(nodeId);
    console.log(button);
    // document.getElementById().textContent = event.data; // the node id
  }

  //this useState provides diagramContainer which chart was selected
  const [activeChart, setActiveChart] = useState("Node");
  console.log("current active chart", activeChart);

  return (
    <div id="diagram-container-wrapper" className={diagramFullScreen ? "full-screen" : "collapse-screen"}>
      {activeChart === "Bar" && <HorizontalBarChart msNames={msNames} msTraces={msTraces} />}
      {activeChart === "Bubble" && <CircleChart msMetrics={msMetrics} handleTogglePanel={handleTogglePanel} />}
      {activeChart === "Node" && <iframe id="chart-frame" width="100%" height="100%" src="/src/Chart/index.html" />}
      <Dropdown setActiveChart={setActiveChart} />
    </div>
  );
};
export default DiagramContainer;

// const msServiceIds = [
//   {
//     name: "cakerSixFunction",
//     serviceIds: [
//       {
//         Name: "cakerSixFunction",
//         Names: ["cakerSixFunction"],
//         Type: "client",
//       },
//       {
//         Name: "cakerSixFunction",
//         Names: ["cakerSixFunction"],
//         Type: "AWS::Lambda",
//       },
//       {
//         AccountId: "498545057811",
//         Name: "cakerSixFunction",
//         Names: ["cakerSixFunction"],
//         Type: "AWS::Lambda::Function",
//       },
//     ],
//   },
//   {
//     name: "cakerFiveFunction",
//     serviceIds: [
//       {
//         Name: "cakerFiveFunction",
//         Names: ["cakerSixFunction"],
//         Type: "client",
//       },
//       {
//         Name: "cakerFiveFunction",
//         Names: ["cakerSixFunction"],
//         Type: "AWS::Lambda",
//       },
//       {
//         AccountId: "498545057811",
//         Name: "cakerFiveFunction",
//         Names: ["cakerSixFunction"],
//         Type: "AWS::Lambda::Function",
//       },
//     ],
//   },
// ];
