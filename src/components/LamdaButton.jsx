

import React, { useState, useEffect } from 'react';

const LamdaButton = (props) => {
  const { name, msMetrics, user, msLogs, setMsLogs } = props;
  const [sortedMetrics, setSortedMetrics] = useState({});
  const [isPanelOpen, setIsPanelOpen] = useState(false);

// Parse metrics for specific name (this could happen in panel but whatever for now)
  useEffect(() => {

    if (!msMetrics || !Array.isArray(msMetrics)) return;
  
    const tempSortedMetrics = {};
    let invocationsSum = 0;
    let errorsSum = 0;
  
    msMetrics.forEach((metricsObj) => {
      const microName = metricsObj.Label.split(' ')[0];
      const label = metricsObj.Label.split(' ')[1]; 

      const timeStamps = [];
  
      if (label === 'Invocations') {
        invocationsSum = metricsObj.Values.reduce((a, b) => {return a + b} ,0);
      } else if (label === 'Errors') {
        metricsObj.Values.forEach((num, i) => {
          errorsSum += num;
          if (num > 0) {
            timeStamps.push(
              <span key={i} className='timestamp-error'>{metricsObj.Timestamps[i]}</span>
            );
            
          } else {
            timeStamps.push(
              <span key={i} className='timestamp'>{metricsObj.Timestamps[i]}</span>
            );
          }
        });
  
        tempSortedMetrics[microName] = {
          invocationsSum,
          errorsSum,
          timeStamps
        };
      }
    });
  
    // console.log('LamdaButton sorted', tempSortedMetrics[name]);
    setSortedMetrics(tempSortedMetrics);
  }, [msMetrics]);

// Fetch all Logs 
  useEffect(() => {
    if (msMetrics) {
      console.log('fetchlogs line 59')

      const fetchLogs = async () => {
        try {
          const response = await fetch('/aws/getLambdaLogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              arn: user.arn
            }),
            muteHttpExceptions: true,
          });
          const data = await response.json();
          setMsLogs(data);
          console.log('micro logs: ', msLogs);
        } catch (error) {
          console.log('error fetching logs', error);
        }
      };
      fetchLogs();
    }
  }, []);

// Populate logs in data window
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  }
  

  return (
    <div>
      {sortedMetrics[name] && (
        <div>
          <button id={name} className='metrics-button' onClick={togglePanel}>{`${name}`}</button>
  
          <div
            id={`${name} Metrics`}
            className={`metrics-toggle-panel ${isPanelOpen ? 'open' : ''}`}
          >
            <ul>
              <li>Invocations: {sortedMetrics[name].invocationsSum}</li>
              <li>Errors: {sortedMetrics[name].errorsSum}</li>
              <li className='timestamps-list'>TimeStamps: {sortedMetrics[name].timeStamps}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default LamdaButton;


