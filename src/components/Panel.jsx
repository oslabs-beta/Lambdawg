
import React, { useEffect, useState} from 'react';
import LamdaButton from '../components/LamdaButton.jsx';
import Refresh from '../components/Refresh.jsx';

const Panel = (props) => {

  const { panelFullScreen, msNames, msMetrics, user, setUer, msLogs, setMsLogs, refreshRedis, setRefreshRedis } = props;
  const [names, setNames] = useState([]);

  // Refresh button msg to redis
  const refreshCachedAwsData = async() => {
    try{
      await fetch('/aws/freshRedis', {
        method: 'POST', 
        header: {'content-type': 'application/json'},
        body: JSON.stringify({
          user_name: user.user_name
        }),
        muteHttpExceptions: true
      })
      if (response.ok){
        setRefreshRedis(true);
      }
      else {
        console.log('Unable to refresh cached data')
      }
    }
    catch{

    }
  }

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
  }, [msNames])

  console.log('panel names array', names)
    return(
      <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>
        <Refresh onClick={refreshCachedAwsData}/><br />
        {names}
      </div>
    )
  }
  export default Panel;