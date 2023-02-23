import React, { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm.jsx';
import SignInForm from './SignInForm.jsx';


const Auth = (props) => {
  const mascot = 'src/assets/mascot.png'
  const [formType, setFormType] = useState("signIn");

  const toggleFormType = () => {
    setFormType(prevFormType => prevFormType === 'signIn' ? 'signUp' : 'signIn');
  };


  return(
    <div id='auth-container'>

      <div id='theme-bg-auth'>
        <img src={mascot} className='large-mascot'/>
        {
        formType === 'signIn' ?
        <SignInForm toggleFormType={toggleFormType} /> :
        <SignUpForm toggleFormType={toggleFormType} />
         }
      </div>

    </div>
  )
 


}

export default Auth;