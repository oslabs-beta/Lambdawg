import React from 'react';

const Refresh = () => {

  const refreshMetrics = () => {
    // send message to dump redis cache
    // initiate new metrics fetch
  }

  return(
    <button id='refresh-button' onClick={refreshMetrics}>REFRESH METRICS CACHE</button>
  )
}

export default Refresh;