import React, { useState, useEffect } from 'react';

const signUpForm = (props) => {


    const [formData, setFormData] = useState({ full_name: '', user_name: '', email: '', password_: '', confirmPassword: '' });
    const { toggleFormType } = props

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const signUpFormData = {
        full_name: formData.full_name,
        user_name: formData.user_name,
        email: formData.email,
        password_: formData.password_
      }
      if (formData.password_ != formData.confirmPassword) return handleMismatchedPasswords();
      if (formData.password_ == formData.confirmPassword) console.log('signing up....')
      console.log(signUpFormData)
      try {
        const response = await fetch('/api/newUser', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          // mode: 'no-cors',
          body: JSON.stringify([signUpFormData]),
        });
      
        if (response.ok) {
          console.log('Sign up successful');
          // Redirect the user to the settings page
          // window.location.href = '/settings';
        } else {
          console.log('Sign up failed');
        }
      } catch (error) {
        console.error(error);
        console.log('Unable to sign-up at this time.');
      }
    };

    const handleMismatchedPasswords = () => {
      console.log('passwords do not match')
      const passwordInput = document.getElementById('confirmPassword');
      passwordInput.style.border = '2px solid red';
    };



  return(

    <div className='form-container'>
          <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label>
          First / Last name<br />
          <input type="name" name="full_name" value={formData.full_name} onChange={handleInputChange} required/>
        </label>
        <label>
          Username<br />
          <input type="username" name="user_name" value={formData.user_name} onChange={handleInputChange} required/>
        </label>
        <label>
          Email<br />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required/>
        </label>
        <label>
          Password<br />
          <input type="password" name="password_" value={formData.password_} onChange={handleInputChange} required/>
        </label>
        <label>
          Confirm Password<br />
          <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required/>
        </label>
        <br />
        <div className='button-flex-wrapper'>
          <button type="submit" className='primary-button'>Sign Up</button>
          <button onClick={toggleFormType} className='secondary-button'>Sign In</button>
        </div>
      </form>
    </div>
  
  )
}


export default signUpForm;




