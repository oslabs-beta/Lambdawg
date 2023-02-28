
import React, { useState } from 'react';

const LandingPageContainer = (props) => {
  const mascot = 'src/assets/mascot.png'
  const video1 = 'src/assets/mock-video1.gif'

// our logo
// a breif description
// sign up button / read docs button
// video presentation elements with descriptions
// basically sell this shit on this page


  return (
    
    <div>
      <div id='landing-page-container'>
        <img src={mascot} className='large-mascot'/>
        <p>a breif description about what it do</p>
        <div className='button-flex-wrapper'>
          <button className='primary-button'>Sign in / up</button>
          <button className='secondary-button'>Read the Docs</button>
        </div>

        <div id='landing-page-flex'>
          <img src={video1} className='video'/>
          <p className='landing-card'>Another peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer minds</p>
        </div>
      </div>


    </div>
  )
}
export default LandingPageContainer;