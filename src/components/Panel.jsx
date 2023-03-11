
import React, { useEffect, useState, useMemo } from 'react';
import LamdaButton from '../components/LamdaButton.jsx';
import Refresh from '../components/Refresh.jsx';

const Panel = (props) => {

  const { panelFullScreen, msNames, msMetrics, user, setUser, msLogs, setMsLogs, refreshRedis, setRefreshRedis } = props;
  const [names, setNames] = useState([]);
  // const render = false;

  // Populate metrics buttons
  useEffect(()=>{
    if (msNames && msMetrics){
      const namesArr = []
      let i = 0;
    
      msNames.forEach((name) => {
        i++;
        namesArr.push(<LamdaButton name={name} key={`${name}MsEl${i}`} msMetrics={msMetrics} user={user} className='panel-names'msLogs={msLogs} setMsLogs={setMsLogs}/>)
      })
      console.log('names in panel', msNames)
      setNames(namesArr)
    }
  }, [msMetrics, msNames])

  console.log('panel names array', names)

    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        <Refresh refreshRedis={refreshRedis} setRefreshRedis={setRefreshRedis} user={user}/><br />
        {names}
      </div>
    )
  }
  export default Panel;

