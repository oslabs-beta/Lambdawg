import React, { useEffect, useState } from 'react';
import Log from './Log.jsx';
import { Scrollbar } from 'react-scrollbars-custom';

const DataWindow = (props) => {
  const { dataWindowFullScreen, msLogs } = props;
  const [logData, setLogData] = useState({});

  // Parse and sort logs
  useEffect(() => {
    if (Array.isArray(msLogs)) {
      const parsedLogs = {};

      msLogs.forEach((log) => {
        if (!parsedLogs[log.FunctionName]) {
          parsedLogs[log.FunctionName] = [];
        }

        log.logs.forEach((stamp) => {
          parsedLogs[log.FunctionName].push({
            timestamp: stamp.timestamp,
            message: stamp.message,
          });
        });
      });
      setLogData(parsedLogs);
    }
  }, [msLogs]);

  return (
    <div
      id='data-window-wrapper'
      className={dataWindowFullScreen ? 'fullscreen' : 'collapse-screen'}
    >
      <Scrollbar style={{ width: 'auto', height: '100%' }}>
        <code>
          {Object.entries(logData).map(([functionName, logs]) => (
            <Log key={functionName} functionName={functionName} logs={logs} />
          ))}
        </code>
      </Scrollbar>
    </div>
  );
};

export default DataWindow;
