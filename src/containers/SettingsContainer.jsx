import React, { useState, useEffect } from 'react';
import SettingsForm from '../components/SettingsForm.jsx';


const SettingsContainer = (props) => {
  const mascot = 'src/assets/mascot.png'
  const { loggedIn, setLoggedIn } = props
  

  return(
    <div id='settings-container'>

      <div id='theme-bg-settings'>
        <img src={mascot} className='large-mascot'/>
        <SettingsForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> 
         
      </div>

    </div>
  )
 


}

export default SettingsContainer;