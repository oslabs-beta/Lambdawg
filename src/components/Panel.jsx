import React, { useEffect, useState, useMemo } from 'react';
import LamdaButton from '../components/LamdaButton.jsx';
import Refresh from '../components/Refresh.jsx';

const Panel = (props) => {

  const { panelFullScreen, msNames, setMsNames, msMetrics, user, setUser, msLogs, setMsLogs, refreshRedis, setRefreshRedis } = props;
  const [names, setNames] = useState([]);

  // Populate metrics buttons
  useEffect(()=>{
    if (msNames && msMetrics){
      const namesArr = []
      let i = 0;
    
      msNames.forEach((name) => {
        i++;
        namesArr.push(
          <LamdaButton 
            name={name} 
            key={`${name}MsEl${i}`} 
            msMetrics={msMetrics} 
            user={user} 
            className='panel-names' 
            msLogs={msLogs} 
            setMsLogs={setMsLogs}
          />
        )
      })
      setNames(namesArr)
    }
  }, [msMetrics, msNames])


    return(
            <div 
            id="panel-wrapper" 
            className={
              panelFullScreen? 'full-screen' : 'collapse-screen'
              }>

              <Refresh
                msNames={msNames}
                setMsNames={setMsNames}
                refreshRedis={refreshRedis}
                setRefreshRedis={setRefreshRedis}
                user={user}
                names={names}
                />
              <br />

              {(names.length > 0)?
                names :
                <span class='loading-text'><h1>Loading...</h1></span> }

            </div>

    )
  }
  export default Panel;

