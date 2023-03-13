import React, { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm.jsx';
import SignInForm from './SignInForm.jsx';
import { useNavigate } from 'react-router-dom';

const Auth = (props) => {
  const mascot = 'src/assets/logo.png'
  const [formType, setFormType] = useState("signIn");
  const { loggedIn, setLoggedIn, user, setUser } = props
  const navigate = useNavigate();


  const toggleFormType = () => {
    setFormType(prevFormType => prevFormType === 'signIn' ? 'signUp' : 'signIn');
  };

  const handleSignUpSuccess = () => {
    setLoggedIn(true);
    navigate('/settings');
  }

  return(
    <div id='auth-container'>
          <img src={mascot} className='auth-logo'/>
      <div id='theme-bg-auth'>
        {
        formType === 'signIn' ?
        <SignInForm toggleFormType={toggleFormType} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}/> :
        <SignUpForm toggleFormType={toggleFormType} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} onSignUpSuccess={handleSignUpSuccess}/>
         }
      </div>

    </div>
  )
 


}

export default Auth;