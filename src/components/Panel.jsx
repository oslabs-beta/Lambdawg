
import React, { useEffect, useState } from 'react';
import LamdaButton from '../components/LamdaButton.jsx';
import Refresh from '../components/Refresh.jsx';

const Panel = (props) => {

  const { panelFullScreen, msNames, msMetrics, user, setUer, msLogs, setMsLogs, refreshRedis, setRefreshRedis } = props;
  const [names, setNames] = useState([]);

  // Populate metrics buttons
  useEffect(()=>{
    if (msNames){
      const namesArr = []
      let i = 0;
    
      msNames.forEach((name) => {
        i++;
        namesArr.push(<LamdaButton name={name} key={`${name}MsEl${i}`} msMetrics={msMetrics} user={user} className='panel-names'msLogs={msLogs} setMsLogs={setMsLogs}/>)
      })
      console.log('names in panel', msNames)
      setNames(namesArr)
    }
  }, [msNames, names])

  console.log('panel names array', names)
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        <Refresh refreshRedis={refreshRedis} setRefreshRedis={setRefreshRedis}/><br />
        {names}
      </div>
    )
  }
  export default Panel;