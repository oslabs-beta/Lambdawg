import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//"Duration": duration of the function execution in seconds.
//"ResponseTime": time taken to generate the response in seconds.

function HorizontalBarChart(props) {
  const { msTraces } = props;
  const [lambdaNames, setLambdaNames] = useState([]);
  const [duration, setDuration] = useState([]);
  const [responseTime, setResponseTime] = useState([]);
  const [lambdaServices, setLambdaServices] = useState([]);

  //configurations of the bar graph
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Lambda Latencies",
      },
      media: [
        {
          query: "(max-width: 1000px)",
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
          },
        },
      ],
    },
  };

  const data = {
    labels: lambdaNames,
    datasets: [
      {
        label: "Duration",
        data: duration,
        borderColor: "#ff6384",
        backgroundColor: "#ff508480",
      },
      {
        label: "Response Time",
        data: responseTime,
        borderColor: "#297fb8",
        backgroundColor: "#35a2eb80",
      },
    ],
  };

  useEffect(() => {
    if (!msTraces || !Array.isArray(msTraces)) {
      return console.log("Data incoming, please wait");
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
    //all parts of msTraces needs to be parsed separately to add to the bar chart options
    setDuration(tempDuration);
    setResponseTime(tempResponseTime);
    setLambdaServices(tempLambdaServices);
    setLambdaNames(tempLambdaNames);
  }, []);

  const width = window.screen.width / 2;
  const height = window.screen.height / 2;

  return (
    //manually inputting style to inherit sizing of parent div
    <Bar className="charts" options={options} data={data} style={{ width: width, height: height, margin: "0 auto" }} />
  );
}
export default HorizontalBarChart;
