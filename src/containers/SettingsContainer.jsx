import React, { useState, useEffect } from 'react';
import SettingsForm from '../components/SettingsForm.jsx';


const SettingsContainer = (props) => {

  const { loggedIn, user } = props
  const mascot = 'src/assets/logo.png'


  return(
    <div id='settings-container'>
      <img src={mascot} className='large-mascot'/>

      <div id='theme-bg-settings'>
        <h1>Welcome, {`${user.full_name}`}!</h1>
        <SettingsForm loggedIn={loggedIn} user={user}/> 

      </div>

   
    <span className='settings-button-wrap'>
          <button className='settings-secondary-button'>Update profile settings / change password</button>
        </span>

    </div>
  )
 
}

export default SettingsContainer;