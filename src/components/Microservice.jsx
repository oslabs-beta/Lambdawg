

import React, { useState, useEffect } from 'react';

const Microservice = (props) => {
  const { name, msMetrics } = props;
  const [sortedMetrics, setSortedMetrics] = useState({});
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [msLogs, setMsLogs] = useState({})

// Parse metrics for specific name (this could happen in panel but whatever for now)
  useEffect(() => {
    if (!msMetrics || !Array.isArray(msMetrics)) return console.log('no metrics here dawg');
    console.log('microservice metrics', msMetrics)
  
    const tempSortedMetrics = {};
    let invocationsSum = 0;
    let errorsSum = 0;
  
    msMetrics.forEach((metricsObj) => {
      const microName = metricsObj.Label.split(' ')[0];
      const label = metricsObj.Label.split(' ')[1]; 

      const timeStamps = [];
  
      if (label === 'Invocations') {
        invocationsSum = metricsObj.Values.reduce((a, b) => {a + b} ,0);
      } else if (label === 'Errors') {
        metricsObj.Values.forEach((num, i) => {
          errorsSum += num;
          if (num > 0) {
            timeStamps.push(
              <span className='timestamp-error'>{metricsObj.Timestamps[i]}</span>
            );
          } else {
            timeStamps.push(
              <span className='timestamp'>{metricsObj.Timestamps[i]}</span>
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
  
    console.log('microservice sorted', tempSortedMetrics[name]);
    setSortedMetrics(tempSortedMetrics);
  }, [msMetrics]);

// Fetch Logs for individual buttons onclick (cahed or whatever later - currently its going to just be a get req for ALL)
useEffect(() => {
  if (msMetrics) {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/getLambdaLogs', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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
    // console.log('for real now', sortedMetrics[name].errorsSum)
    setIsPanelOpen(!isPanelOpen);
    console.log('test', msLogs[0])
    let i = 0;
    const logsDisplay = document.getElementById('log-ul');

    msLogs[0].logs.forEach(log => {
      const message = msLogs[0].logs[i].message;
      const timestamp = msLogs[0].logs[i].timestamp;

      const logwrap = document.createElement('span')
      const funcName = document.createElement('li')
      const messageLi = document.createElement('li')
      const timestampLi = document.createElement('li')

      logwrap.className = 'log-wrap'
      funcName.className = 'log-name'
      messageLi.className = 'msg-name'
      timestampLi.className = 'time-name'

      funcName.innerText = `${msLogs[0].FunctionName}`
      messageLi.innerText = `${message}`;
      timestampLi.innerText = `${timestamp}`;
      logsDisplay.appendChild(logwrap)
      logwrap.appendChild(funcName)
      logwrap.appendChild(messageLi)
      logwrap.appendChild(timestampLi)

      i++;
    })

    
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

export default Microservice;





// import React, { useState } from 'react';

// const Microservice = ({ name, msMetrics }) => {
//   const [isPanelOpen, setIsPanelOpen] = useState(false);

//   const togglePanel = () => {
//     setIsPanelOpen(!isPanelOpen);
//   };

//   return (
//     <div>
//       <button onClick={togglePanel}>{name}</button>
//       <div className={`metrics-toggle-panel ${isPanelOpen ? 'open' : ''}`}>
//         <ul>
//           {msMetrics &&
//             msMetrics.map((metricsObj) => {
//               const microName = metricsObj.Label.split(' ')[0];
//               const label = metricsObj.Label.split(' ')[1];

//               if (label === 'Invocations') {
//                 return (
//                   <li key={`${microName}-invocations`}>
//                     Invocations: {metricsObj.Values.reduce((a, b) => a + b)}
//                   </li>
//                 );
//               }

//               if (label === 'Errors') {
//                 const timeStamps = metricsObj.Values.map((num, i) => (
//                   <span key={`${microName}-${i}`} className={num > 0 ? 'timestamp-error' : 'timestamp'}>
//                     {metricsObj.Timestamps[i]}
//                   </span>
//                 ));

//                 return (
//                   <li key={`${microName}-errors`}>
//                     Errors: {metricsObj.Values.reduce((a, b) => a + b)}
//                     <ul>{timeStamps}</ul>
//                   </li>
//                 );
//               }

//               return null;
//             })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Microservice;
