
import React, { useEffect, useState } from 'react';
import Log from './Log.jsx';

const DataWindow = (props) => {
  const { dataWindowFullScreen, msLogs } = props;
  const [logData, setLogData] = useState({});

  useEffect(() => {
    if (Array.isArray(msLogs)) {
      console.log('loggies', msLogs);

      const parsedLogs = {};

      msLogs.forEach(log => {
        if (!parsedLogs[log.FunctionName]) {
          parsedLogs[log.FunctionName] = [];
        }
        console.log('119', parsedLogs)

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

  console.log('inside data', logData);

  return (
    <div id='data-window-wrapper' className={dataWindowFullScreen ? 'fullscreen' : 'collapse-screen'}>
      <code>
        {Object.entries(logData).map(([functionName, logs]) => (
          <Log key={functionName} functionName={functionName} logs={logs} />
        ))}
      </code>
    </div>
  );
};

export default DataWindow;
