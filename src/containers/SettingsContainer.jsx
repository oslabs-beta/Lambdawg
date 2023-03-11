import React, { useEffect } from 'react';
import SettingsForm from '../components/SettingsForm.jsx';


const SettingsContainer = (props) => {

  const { loggedIn, user, setUser } = props
  const mascot = 'src/assets/logo.png'

  // this forces the settings container to fetch new user data to display, w/o it - its going to be blank
  // useEffect(()=>{ console.log('') }, [user])

  return(
    <div>

      <div id='settings-container'>
        <img src={mascot} className='large-mascot'/>

        <div id='theme-bg-settings'>
          <h1>Welcome, {`${user.full_name}`}!</h1>
          <SettingsForm loggedIn={loggedIn} user={user} setUser={setUser}/> 

        </div>

    
      <span className='settings-button-wrap'>
            <button className='settings-secondary-button'>Reset my password</button>
          </span>

    </div>

</div>

  )
 }

export default SettingsContainer;