
import React, { useEffect, useState, useMemo } from 'react';
import LamdaButton from '../components/LamdaButton.jsx';
import Refresh from '../components/Refresh.jsx';
import { Scrollbar } from 'react-scrollbars-custom';

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
      console.log('names in panel', msNames)
      setNames(namesArr)
    }
  }, [msMetrics, msNames])

  console.log('panel names array', names)

    return(
            <div id="panel-wrapper" className={panelFullScreen? 'full-screen' : 'collapse-screen'}>

              <Refresh
                msNames={msNames}
                setMsNames={setMsNames}
                refreshRedis={refreshRedis}
                setRefreshRedis={setRefreshRedis}
                user={user}
                names={names}
                />
              <br />
              {/* <Scrollbar style={{ width: '100%', height: '100%' }}> */}

              {(names.length > 0)?
                names :
                <span class='loading-text'><h1>Loading...</h1></span> }
              {/* </Scrollbar> */}

            </div>

    )
  }
  export default Panel;

