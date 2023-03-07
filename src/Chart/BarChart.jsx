import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
  const [traceData, setTraceData] = useState([]);

  const traceDataMock = [
    {
      Name: "cakerTwoFunction",
      Duration: 1.228,
      ResponseTime: 1.151,
    },
    {
      Name: "cakerFirstFunction",
      Duration: 3.141,
      ResponseTime: 3.043,
    },
    {
      Name: "cakerThreeFunction",
      Duration: 3.045,
      ResponseTime: 2.825,
    },
    {
      Name: "cakerFourFunction",
      Duration: 3.045,
      ResponseTime: 2.825,
    },
  ];

  function createSeriesData(traceData) {
    const seriesArray = [];
    for (let traceObj of traceData) {
      // const name = traceObj.Name;
      seriesArray.push({
        name: "Duration",
        data: [
          {
            x: traceObj.Name,
            y: traceObj.Duration,
            goals: [
              {
                name: "ResponseTime",
                value: traceObj.ResponseTime,
                strokeWidth: 2,
                strokeDashArray: 2,
                strokeColor: "#775DD0",
              },
            ],
          },
        ],
      });
    }
    return seriesArray;
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/getTraces");
  //     const data = await response.json();
  //     setTraceData(data);
  //   };
  //   fetchData();
  // }, []);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 200,
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          // dataLabels: {
          //   position: "left",
          //   formatter: function (val, opt) {
          //     const seriesName = opt.w.config.series[opt.seriesIndex].name;
          //     return seriesName;
          //   },
          // },
        },
      },
      colors: ["#00E396"],
      dataLabels: {
        formatter: function (val, opt) {
          const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;

          if (goals && goals.length) {
            return `${val} / ${goals[0].value}`;
          }
          return val;
        },
      },
      legend: {
        labels: {
          colors: "#ff0000",
        },
        show: true,
        showForSingleSeries: true,
        customLegendItems: ["Duration", "Function Response Time"],
        markers: {
          fillColors: ["#00E396", "#775DD0"],
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
    },
  });

  useEffect(() => {
    // setChartData({ ...chartData, series: createSeriesData(traceData) });
    //use mock data array for right now
    setChartData({ ...chartData, series: createSeriesData(traceDataMock) });
  }, [traceData]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default BarChart;
