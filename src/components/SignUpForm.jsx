import React, { useState, useEffect } from 'react';

const signUpForm = (props) => {


    const [formData, setFormData] = useState({ full_name: '', user_name: '', email: '', password: '', confirmPassword: '' });
    const { toggleFormType } = props

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (formData.password != formData.confirmPassword) handleMismatchedPasswords();
      
      // if they do match, submit form (make POST req to DB, redirect to settingsPage passing in formdata)
      // redirect to sign in
    };

    const handleMismatchedPasswords = () => {
        const passwordInput = document.getElementById('confirmPassword');
        passwordInput.style.border = '2px solid red';
     };



  return(

    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label>
        First / Last name<br />
        <input type="name" name="full_name" value={formData.full_name} onChange={handleInputChange} />
      </label>
      <label>
        Username<br />
        <input type="username" name="user_name" value={formData.user_name} onChange={handleInputChange} />
      </label>
      <label>
        Email<br />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Password<br />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
      </label>
      <label>
        Confirm Password<br />
        <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
      </label>
      <br />
      <div className='flex-wrapper'>
        <button type="submit">Sign Up</button>
        <button onClick={toggleFormType}>Sign In</button>
      </div>

  </form>


    </div>
  
  )
}


export default signUpForm;
