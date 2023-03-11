
import React from 'react';
import LamdaButton from '../components/LamdaButton.jsx';
import Refresh from '../components/Refresh.jsx';
// refresh: true in body of refresh request to / set off fresh fetch chain

const Panel = (props) => {

  const { panelFullScreen, msNames, msMetrics, user, msLogs, setMsLogs } = props;
 
  const names = []
  let i = 0;
  if (msNames){
    msNames.forEach((name) => {
      i++;
      names.push(<LamdaButton name={name} key={`${name}MsEl${i}`} msMetrics={msMetrics} user={user} className='panel-names'msLogs={msLogs} setMsLogs={setMsLogs}/>)
    })
  }


  
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        <Refresh /><br />
        {names}
      </div>
    )
  }
  export default Panel;