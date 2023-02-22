import React, { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm.jsx';
import SignInForm from './SignInForm.jsx';


const Auth = (props) => {
  const [formType, setFormType] = useState("signIn");

  const toggleFormType = () => {
    setFormType(prevFormType => prevFormType === 'signIn' ? 'signUp' : 'signIn');
  };


  return(
    <div>
      {
      formType === 'signIn' ? 
      <SignInForm toggleFormType={toggleFormType} /> :
      <SignUpForm toggleFormType={toggleFormType} />
       }
    </div>
  )
 


}

export default Auth;