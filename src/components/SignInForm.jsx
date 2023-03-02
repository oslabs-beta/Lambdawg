
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const SignInForm = (props) => {
  const [formData, setFormData] = useState({ user_name: '', password_: '' });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signInFormData = {
      user_name: formData.user_name,
      password_: formData.password_,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/${formData.user_name}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify([signInFormData]),
      });

      if (response.ok) {
        console.log('Sign in attempt passed auth');
        setShouldRedirect(true);
      } else {
        console.log('Invalid password');
        const passwordInput = document.getElementById('password_');
        passwordInput.style.border = '2px solid red';
        passwordInput.value = '';
      }
    } catch (error) {
      console.error(error);
      console.log('Unable to sign-in at this time.');
    }
  };

  if (shouldRedirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="form-container">
      <h1>SIGN IN</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="username" name="user_name" value={formData.user_name} onChange={handleInputChange} required />
        </label>

        <label>
          Password
          <input type="password" name="password_" id="password_" value={formData.password_} onChange={handleInputChange} required />
        </label>

        <br />
        <div className="button-flex-wrapper">
          <button type="submit" className="primary-button">Sign In</button>
          <button onClick={props.toggleFormType} className="secondary-button">Sign Up</button>
        </div>
        <br />
        
        <label className="centered-text">I forgot my password / username</label>
      </form>
    </div>
  );
};

export default SignInForm;
