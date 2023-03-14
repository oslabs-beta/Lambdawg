import React from "react";
const mascot = "src/assets/mascot_head.svg";

const BouncingDotsLoader = (props) => {
  return (
    <div className="bouncing-loader bouncing-body">
      <div>
        <img src={mascot} alt="loading mascot" />{" "}
      </div>
      <div>
        <img src={mascot} alt="loading mascot" />{" "}
      </div>
      <div>
        <img src={mascot} alt="loading mascot" />{" "}
      </div>
    </div>
  );
};

export default BouncingDotsLoader;
