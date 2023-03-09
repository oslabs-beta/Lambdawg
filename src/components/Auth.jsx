import React, { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm.jsx';
import SignInForm from './SignInForm.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';


const Auth = (props) => {
  const mascot = 'src/assets/logo.png'
  const [formType, setFormType] = useState("signIn");
  const { loggedIn, setLoggedIn, user, setUser } = props


  
  const toggleFormType = () => {
    setFormType(prevFormType => prevFormType === 'signIn' ? 'signUp' : 'signIn');
  };


  return(
    <div id='auth-container'>
          <img src={mascot} className='auth-logo'/>
      <div id='theme-bg-auth'>
        {/* <img src={mascot} className='large-mascot'/> */}
        {
        formType === 'signIn' ?
        <SignInForm toggleFormType={toggleFormType} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}/> :
        <SignUpForm toggleFormType={toggleFormType} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}/>
         }
      </div>

    </div>
  )
 


}

export default Auth;