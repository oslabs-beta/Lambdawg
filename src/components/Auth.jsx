import React, { useState, useEffect } from 'react';
import SignUpForm from './SignUpForm.jsx';
import SignInForm from './SignInForm.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';


const Auth = (props) => {
  const mascot = 'src/assets/logo.png'
  const [formType, setFormType] = useState("signIn");

  const { loggedIn, setLoggedIn, userName, setUserName } = props
  
  const toggleFormType = () => {
    setFormType(prevFormType => prevFormType === 'signIn' ? 'signUp' : 'signIn');
  };

  // useEffect(() => {
  //   if (loggedIn) {
  //     // Render the DashboardContainer component if the user is logged in
  //     return <DashboardContainer />;
  //   }
  // }, [loggedIn]);

  return(
    <div id='auth-container'>
          <img src={mascot} className='auth-logo'/>
      <div id='theme-bg-auth'>
        {/* <img src={mascot} className='large-mascot'/> */}
        {
        formType === 'signIn' ?
        <SignInForm toggleFormType={toggleFormType} loggedIn={loggedIn} setLoggedIn={setLoggedIn} userName={userName} setUserName={setUserName}/> :
        <SignUpForm toggleFormType={toggleFormType} />
         }
      </div>

    </div>
  )
 


}

export default Auth;