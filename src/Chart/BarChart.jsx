import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//traceObj.data - this is the name of func
//traceObj.summary
//"Duration": This key has the value 1.311, which is the duration of the function execution in seconds.
//"ResponseTime": This key has the value 1.157, which is the time taken to generate the response in seconds.

function HorizontalBarChart(props) {
  const { msTraces } = props;
  const [lambdaNames, setLambdaNames] = useState([]);
  const [duration, setDuration] = useState([]);
  const [responseTime, setResponseTime] = useState([]);
  const [lambdaServices, setLambdaServices] = useState([]);

  console.log("in horiz bar, traces", msTraces);
  //msNames is array of names...dunno if we actually need it tho

  //configurations of the bar graph
  const options = {
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

  const data = {
    labels: lambdaNames,
    datasets: [
      {
        label: "Duration",
        data: duration,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 80, 132, 0.5)",
      },
      {
        label: "Response Time",
        data: responseTime,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    if (!msTraces || !Array.isArray(msTraces)) {
      return console.log("there aint none here them lambdas");
    }
    const tempDuration = [];
    const tempResponseTime = [];
    const tempLambdaServices = [];
    const tempLambdaNames = [];

    msTraces.forEach((traceObj) => {
      tempDuration.push(traceObj.duration);
      tempResponseTime.push(traceObj.responseTime);
      tempLambdaNames.push(traceObj.name);
      tempLambdaServices.push(traceObj.serviceIds);
    });
    //all parts of msTraces needs to be parsed to add to the bar chart options
    setDuration(tempDuration);
    setResponseTime(tempResponseTime);
    setLambdaServices(tempLambdaServices);
    setLambdaNames(tempLambdaNames);
    console.log("this is lambda serviceid array", tempLambdaServices);
  }, []);

  return <Bar options={options} data={data} />;
}
export default HorizontalBarChart;
