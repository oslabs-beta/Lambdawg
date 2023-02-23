import React, { useState, useEffect } from 'react';


const signInForm = (props) => {

  const [formData, setFormData] = useState({ user_name: '', password_: '' });
  const { toggleFormType } = props
  const { loggedIn, setLoggedIn } = props

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('signing in....')
    // check credentials against database
    // if no match, hangleWrongPassword();
    // if matched, create cookie and redirect to dashboard
    const signInFormData = {
      user_name: formData.user_name,
      password_: formData.password_
    }

    try {
      const response = await fetch(`http://localhost:3000/api/${formData.user_name}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // mode: 'no-cors',
        body: JSON.stringify([signInFormData]),
      });
    
      if (response.ok) { // password was correct
        console.log('Sign in attempt passed auth');
        setLoggedIn(true);
      } 
      else { // invalid password
        console.log('Invalid password');
        const passwordInput = document.getElementById('password_');
        passwordInput.style.border = '2px solid red';
        passwordInput.value = ''
      }
    } 
    catch (error) { // problem making the request
      console.error(error);
      console.log('Unable to sign-in at this time.');
    }
  };


return(

  <div className='form-container'>
    <form onSubmit={handleSubmit}>

    <label>
      Username<br />
      <input type="username" name="user_name" value={formData.user_name} onChange={handleInputChange} required/>
    </label>

    <label>
      Password<br />
      <input type="password" name="password_" id="password_" value={formData.password_} onChange={handleInputChange} required/>
    </label>
   
    <br />
    <div className='button-flex-wrapper'>
      <button type="submit" className='primary-button'>Sign In</button>
      <button onClick={toggleFormType} className='secondary-button'>Sign Up</button>
    </div>
    <br />
    <label className='centered-text'>I forgot my password / username</label>

</form>


  </div>

)


}

export default signInForm;