import React, { useState, useEffect } from 'react';


const signInForm = (props) => {

  const [formData, setFormData] = useState({ user_name: '', password: '' });
  const { toggleFormType } = props

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('signing in....')
    // check credentials against database
    // if no match, hangleWrongPassword();
    // if matched, create cookie and redirect to dashboard
  };

  const handleWrongPassword = () => {
      const passwordInput = document.getElementById('password');
      passwordInput.style.border = '2px solid red';
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
      <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} required/>
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