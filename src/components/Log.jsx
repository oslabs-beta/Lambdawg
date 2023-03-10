
import React from 'react';

function Log(props) {
  const { logs, functionName } = props;

  console.log('inside LOG', logs)
  return (
    <div id={functionName}>
      <h2>{functionName}</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <div>{log.timestamp}: {log.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Log;
