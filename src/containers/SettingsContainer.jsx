import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SettingsForm from '../components/SettingsForm.jsx';


const SettingsContainer = (props) => {

  const { loggedIn, setLoggedIn } = props
  const mascot = 'src/assets/logo.png'


  return(
    <div id='settings-container'>
      <img src={mascot} className='large-mascot'/>

      <div id='theme-bg-settings'>
        <h1>Welcome, Username!</h1>


        <SettingsForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> 
      </div>

    <p className='horizontal-line'>Need help getting started? <a href={'/docs'}><button className='secondary-button'>Read the Docs</button></a> </p>
    <span className='settings-button-wrap'>
          <button className='secondary-button'>Update Profile</button>
          <button className='secondary-button'>Change Password</button>
        </span>

    </div>
  )
 


}

export default SettingsContainer;