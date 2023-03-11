
// import React, { useEffect, useState } from 'react';
// import Log from './Log.jsx';

// const DataWindow = (props) => {
//   const { dataWindowFullScreen, msLogs } = props;
//   const [logData, setLogData] = useState({});

//   // Parse and sort logs
//   useEffect(() => {
//     if (Array.isArray(msLogs)) {

//       const parsedLogs = {};

//       msLogs.forEach(log => {
//         if (!parsedLogs[log.FunctionName]) {
//           parsedLogs[log.FunctionName] = [];
//         }

//         log.logs.forEach(stamp => {
//           parsedLogs[log.FunctionName].push({
//             timestamp: stamp.timestamp,
//             message: stamp.message,
//         });
//         })
//       });
//       setLogData(parsedLogs);
//     }
//   }, [msLogs]);

//   return (
//     <div id='data-window-wrapper' className={dataWindowFullScreen ? 'fullscreen' : 'collapse-screen'}>
//       <code>
//         {logData ? (
//           Object.entries(logData).map(([functionName, logs]) => (
//             <Log key={functionName} functionName={functionName} logs={logs} />
//           ))
//         ) : 
//           <span class='loading-text'><h1>Loading...</h1></span>
//         }
//       </code>
//     </div>
//   );
  
// };

// export default DataWindow;

import React, { useEffect, useState } from 'react';
import Log from './Log.jsx';

const DataWindow = (props) => {
  const { dataWindowFullScreen, msLogs } = props;
  const [logData, setLogData] = useState({});

  // Parse and sort logs
  useEffect(() => {
    if (Array.isArray(msLogs)) {

      const parsedLogs = {};

      msLogs.forEach(log => {
        if (!parsedLogs[log.FunctionName]) {
          parsedLogs[log.FunctionName] = [];
        }

        log.logs.forEach(stamp => {
          parsedLogs[log.FunctionName].push({
            timestamp: stamp.timestamp,
            message: stamp.message,
        });
        })
      });
      setLogData(parsedLogs);
    }
  }, [msLogs]);

  return (
    <div id='data-window-wrapper' className={dataWindowFullScreen ? 'fullscreen' : 'collapse-screen'}>
      <code>
        {Object.keys(logData).length > 0 ? (
          Object.entries(logData).map(([functionName, logs]) => (
            <Log key={functionName} functionName={functionName} logs={logs} />
          ))
        ) : 
          <span class='loading-text'><br/><h1>Loading...</h1></span>
        }
      </code>
    </div>
  );
  
};

export default DataWindow;

