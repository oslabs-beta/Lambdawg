import React from 'react';
import LamdaButton from '../components/LamdaButton.jsx';
import Refresh from '../components/Refresh.jsx';
import { Scrollbar } from 'react-scrollbars-custom';

const Panel = (props) => {
  const { panelFullScreen, msNames, msMetrics, user, msLogs, setMsLogs } =
    props;

  const names = [];
  let i = 0;
  if (msNames) {
    msNames.forEach((name) => {
      i++;
      names.push(
        <LamdaButton
          name={name}
          key={`${name}MsEl${i}`}
          msMetrics={msMetrics}
          user={user}
          className='panel-names'
          msLogs={msLogs}
          setMsLogs={setMsLogs}
        />
      );
    });
  }

  return (
    <div
      id='panel-wrapper'
      className={panelFullScreen ? 'full-screen' : 'collapse-screen'}
    >
      <Refresh />
      <br />
      <Scrollbar style={{ width: '100%', height: '100%' }}>{names}</Scrollbar>
    </div>
  );
};
export default Panel;
