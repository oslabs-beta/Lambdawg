
import React, { useState } from 'react';
import Switch from 'react-switch'

const Navbar = (props) => {

    const docsLink = '/docs';
    const settingsLink = '/settings'
    const logo = 'src/assets/lambdawg_logo.png'
    const tempSettingsIcon = 'src/assets/temp_settings_icon.png'

  return(
    // Logo
    <div id="NavbarContainer">

      <img src={logo} alt="LAMBDAWG logo" className="headerLogo"/>
      <div id="headerRight">
        <a href={docsLink}>READ ME</a>



        <img src={tempSettingsIcon} className="tempSettingsIcon"/>
      </div>


    </div>

    // Docs
    // Dark Mode toggle
    // Settings 
  )
}
export default Navbar;