import React, { useState } from "react";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { GiBubbles } from "react-icons/gi";
import { GrNodes } from "react-icons/gr";

function DropdownItem(props) {
  const { item, onClick } = props;

  return (
    <div className="dropdown-item" onClick={onClick}>
      {item}
    </div>
  );
}

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const options = [<RiBarChartHorizontalFill />, <GiBubbles />, <GrNodes />];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="chart-dropdown">
      <div className="chart-dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "Select an option"} <span className="caret"></span>
      </div>
      <div className={`chart-dropdown-menu ${isOpen ? "show" : ""}`}>
        {options.map((option) => (
          <DropdownItem key={option} item={option} onClick={() => handleOptionClick(option)} />
        ))}
      </div>
    </div>
  );
}
export default Dropdown;
