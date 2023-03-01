import React, { useState, useEffect } from 'react';

const Microservice = (props) => {
  const { name } = props;
// will also recive metrics as props

// const appendMetrics = () => {
  // create a div that contains the metrics data in this format:
  // Metric: metric info
  // Metric: metric info etc.
  // it will then be appended directly under the button
  // onClick again or on click of another button it will remove the appended div from the dom.
// }
  return(
    <button id={name}>{`${name}`}</button>
    //microservicemetrics.jsx componant passing metrics props to it
    // onclick it will trigger appendMetrics function
  )
}

export default Microservice;