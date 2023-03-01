
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'

const LandingPageContainer = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const mascot = 'src/assets/mascot.png'
  const video1 = 'src/assets/mock-video1.gif'
  const mobile = 'src/assets/mobile.png'
  const screenshot = 'src/assets/screenshot.png';
// our logo
// a breif description
// sign up button / read docs button
// video presentation elements with descriptions
// basically sell this shit on this page
const redirectToAuth = () => {
  setShouldRedirect(true);
}

if (shouldRedirect) {
  return <Navigate to="/auth" />;
}

  return (
    
    <div>
      <div id='landing-page-container'>

       
          <img src={mascot} className='large-mascot'/>
          <p>An amazing app that blows socks off of seasoned developers.</p>
          <div className='button-flex-wrapper'>
            <button id='get-started-button' className='primary-button' onClick={redirectToAuth}>Get Started</button>
          </div>
      

        <div id='landing-page-flex'>

          <div className='info-card-wrapper'>
            <div className='info-card'><h1>Stuff</h1>Another peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world </div>
            <div className='info-card'><h1>About</h1>Another peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world </div>
            <div className='info-card'><h1>Things</h1>Another peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world </div>
          </div>

          <div className='info-card-wrapper'>
            <img src={screenshot} className='screen-shot'/>
            <img src={mobile} className='screen-shot-mobile'/>
            <img src={mobile} className='screen-shot-mobile'/>
            <img src={mobile} className='screen-shot-mobile'/>

          </div>


          <p className='landing-card'>Another peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer mindsAnother peek into the amazing world of our developer minds</p>
        </div>
      </div>


    </div>
  )
}
export default LandingPageContainer;