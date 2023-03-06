import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SettingsForm from '../components/SettingsForm.jsx';


const SettingsContainer = (props) => {

  const { loggedIn, userName } = props
  const mascot = 'src/assets/logo.png'


  return(
    <div id='settings-container'>
      <img src={mascot} className='large-mascot'/>

      <div id='theme-bg-settings'>
        <h1>Welcome, {`${userName}`}!</h1>


        <SettingsForm loggedIn={loggedIn} userName={userName}/> 
      </div>

   
    <span className='settings-button-wrap'>
          <button className='settings-secondary-button'>Update Profile</button>
          <button className='settings-secondary-button'>Change Password</button>
        </span>

    </div>
  )
 


}

export default SettingsContainer;