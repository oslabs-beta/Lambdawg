
import React from 'react';

function Log(props) {
  const { logs, functionName } = props;

  return (
    <div id={functionName}>
      <h2 className='log-name'>{functionName}</h2>
      <ul id='log-ul'>
        {logs.map((log, index) => (
          <li className='log-wrap' key={index}>
            <div>
              <span className='time-stamp'>{log.timestamp}</span>: <br />
              {log.message}
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Log;
