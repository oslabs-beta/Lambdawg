import React, { useState, useEffect } from 'react';

const Microservice = (props) => {
  const { name } = props;

  return(
    <button>{`${name}`}</button>
  )
}

export default Microservice;