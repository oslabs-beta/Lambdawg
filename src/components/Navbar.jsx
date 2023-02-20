
import React, { useState } from 'react';
// import Switch from 'react-switch'

const Navbar = (props) => {

    const docsLink = '/docs';
    const settingsLink = '/settings'
    const tempSettingsIcon = 'src/assets/temp_settings_icon.png'

  return(

    <div id="NavbarContainer">

      <h1>L A M B D A W G </h1>
      <div id="headerRight">
        <a href={docsLink}>READ ME</a>
        <a href={settingsLink}>
          <img src={tempSettingsIcon} className="tempSettingsIcon"/>
          </a>
      </div>

    </div>

  )
}
export default Navbar;