import React, { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//traceObj.data - this is the name of func
//traceObj.summary
//"Duration": This key has the value 1.311, which is the duration of the function execution in seconds.
//"ResponseTime": This key has the value 1.157, which is the time taken to generate the response in seconds.

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Lambda Latencies",
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "Duration",
      data: [3, 6, 10, 5, 8, 7, 2],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Response Time",
      data: [3, 6, 10, 5, 8, 7, 2],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function HorizontalBarChart(props) {
  const { msTraces, msNames } = props;
  const { lambdaNames, setLambdaNames } = useState([]);
  const { duration, setDuration } = useState([]);
  const { responseTime, setResponseTime } = useState([]);
  const { lambdaServices, setlambdaServices } = useState([]);
  console.log("in horiz bar, traces n names", msTraces, msNames);
  //msNames is array of names...dunno if we actually need it tho

  useEffect(() => {
    if (!msTraces || !Array.isArray(msTraces)) {
      console.log("there aint none here them lambdas");
    }
    const tempDuration = [];
    const tempResponseTime = [];
    const tempLambdaServices = [];

    msTraces.forEach((traceObj) => {
      //what if undefined?
      //is there a way to make sure we know which graph is which?
      //we need duration data array
      tempDuration.push(traceObj.duration);
      //we need responsetime data array
      tempResponseTime.push(traceObj.responseTime);
    });

    //msTraces looks like response array below
  });

  return <Bar options={options} data={data} />;
}
export default HorizontalBarChart;

//what I expect msNames to be
const lambdaNames = [
  "cakerFiveFunction",
  "cakerThreeFunction",
  "cakerFourFunction",
  "cakerFirstFunction",
  "cakerTwoFunction",
];
//what I expect msTraces to be
const response = [
  { name: "cakerFourFunction", duration: undefined, responseTime: undefined, serviceIds: undefined },
  {
    name: "cakerThreeFunction",
    duration: 2.953,
    responseTime: 2.894,
    serviceIds: [
      { Name: "cakerThreeFunction", Names: ["cakerThreeFunction"], Type: "client" },
      {
        AccountId: "498545057811",
        Name: "cakerThreeFunction",
        Names: ["cakerThreeFunction"],
        Type: "AWS::Lambda::Function",
      },
      { Name: "cakerThreeFunction", Names: ["cakerThreeFunction"], Type: "AWS::Lambda" },
    ],
  },
  {
    name: "cakerTwoFunction",
    duration: 1.311,
    responseTime: 1.157,
    serviceIds: [
      { Name: "cakerTwoFunction", Names: ["cakerTwoFunction"], Type: "AWS::Lambda" },
      { Name: "cakerTwoFunction", Names: ["cakerTwoFunction"], Type: "client" },
      {
        AccountId: "498545057811",
        Name: "cakerTwoFunction",
        Names: ["cakerTwoFunction"],
        Type: "AWS::Lambda::Function",
      },
    ],
  },
  {
    name: "cakerFirstFunction",
    duration: 3.16,
    responseTime: 3.041,
    serviceIds: [
      {
        AccountId: "498545057811",
        Name: "cakerFirstFunction",
        Names: ["cakerFirstFunction"],
        Type: "AWS::Lambda::Function",
      },
      { Name: "cakerFirstFunction", Names: ["cakerFirstFunction"], Type: "client" },
      { Name: "cakerFirstFunction", Names: ["cakerFirstFunction"], Type: "AWS::Lambda" },
    ],
  },
];
