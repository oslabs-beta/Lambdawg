
import React from 'react';

function Log(props) {
  const { logs, functionName } = props;

  console.log('inside LOG', logs)
  return (
    <div id={functionName}>
      <h2 className='log-name'>{functionName}</h2>
      <ul id='log-ul'>
        {logs.map((log, index) => (
          <li key={index} className='log-wrap'>
            <div className='msg-name'>
              <span className='time-stamp'>{log.timestamp}</span>:<br />
              {log.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Log;
