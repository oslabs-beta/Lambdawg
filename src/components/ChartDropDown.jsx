import React, { useState } from "react";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { GiBubbles } from "react-icons/gi";
import { GrNodes } from "react-icons/gr";

//renders each chart icon in the dropdown
function DropdownItem(props) {
  const { onClick, chartIcons } = props;
  return (
    <div className="class=dropdown-item nav-links" onClick={onClick}>
      {chartIcons}
    </div>
  );
}
//renders the dropdown menu
function Dropdown(props) {
  const { setActiveChart } = props;
  const [selectedChart, setSelectedChart] = useState(null);
  const [dropIsOpen, setDropIsOpen] = useState(false);

  //options and corresponding icons
  const options = ["Bar", "Bubble", "Node"];
  const chartIcons = [<RiBarChartHorizontalFill />, <GiBubbles />, <GrNodes />];

  //icons don't render properly in JSX, so using a func to render icon based on selectedChart
  const showIcon = (optionsArr, iconsArr, option) => {
    return chartIcons[optionsArr.indexOf(option)];
  };

  //sets SelectedChart with the corresponding chart option for the icon clicked. setActiveChart to send it to DiagramContainer for chart render
  const handleOptionClick = (chart) => {
    console.log("you clicked " + chart);
    setSelectedChart(chart);
    setActiveChart(chart);
    setDropIsOpen(false);
  };

  return (
    <div className="chart-dropdown">
      <div className="chart-dropdown-toggle" onClick={() => setDropIsOpen(!dropIsOpen)}>
        {selectedChart ? showIcon(options, chartIcons, selectedChart) : "View"}
      </div>
      <div className={`chart-dropdown-menu ${dropIsOpen ? "show" : ""}`}>
        {options.map((chart, i) => (
          <DropdownItem
            key={`chart${i}`}
            chart={chart}
            chartIcons={chartIcons[i]}
            onClick={() => handleOptionClick(chart)}
          />
        ))}
      </div>
    </div>
  );
}
export default Dropdown;
