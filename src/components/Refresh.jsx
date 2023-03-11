import React from 'react';
import { useNavigate } from 'react-router-dom';

const Refresh = (props) => {
const { refreshRedis, setRefreshRedis, user, names, setMsNames, msNames } = props;
const navigate = useNavigate()

  const refreshMetrics = async () => {
    setRefreshRedis(false);
    try{
      const response = await fetch('/aws/deleteRedis', {
        method: 'DELETE', 
        header: {'content-type': 'application/json'},
        body: JSON.stringify({
          user_name: user.user_name
        }),
        muteHttpExceptions: true
      })
      if (response.ok){
        console.log('response ok from redis')
        setRefreshRedis(true);
      }
      else {
        console.log('Unable to refresh cached data')
      }
    }
    catch(error){
      console.log('error reaching redis for refesh: ', error)
    }
  }

  return(
    <button id='refresh-button' onClick={refreshMetrics}>REFRESH METRICS CACHE</button>
  )
}

export default Refresh;