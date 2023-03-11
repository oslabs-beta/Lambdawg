
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"; 

const Settings = (props) => {
  const { user, setUser } = props;
  const [formData, setFormData] = useState({ 
    password_: '',
    arn: '',
    region: '',
  });

  const navigate = useNavigate();

  useEffect(()=>{
    console.log('use effect in settings form')
  }, [user])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('username in handlesubmit settings ', user.user_name)

    const arnFormData = {
      full_name: user.full_name, 
      user_name: user.user_name,
      email: user.email, 
      password_: formData.password_,
      _id: user._id,
      arn: formData.arn,
      region: formData.aws_region,
    };

    try{
      console.log('TRY in settings (the form data)', arnFormData)
      const response = await fetch(`/api/edit/${user.user_name}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify([arnFormData])
      })

      if (response.ok){
        const data = await response.json();
        console.log('user updated from settings! response:', data)
        navigate('/dashboard');
      }
      else {
        console.log('Unable to patch arn etc from settings')
        console.log('user inside else block of fetch in settings', user)
      }

    }
    catch(error){
      console.log('Something went wrong in settings patch req')

    }
    // setUser({ user_name: user.user_name, arn: formData.arn, region: formData.aws_region })
    setUser((prevUser) => ({ ...prevUser, arn: formData.arn, region: formData.aws_region }));
  }

// console.log(user.arn)

  return(
    <div className='horizontal-line'>
      <p>
        Step 1: <span className='visible-link'><a href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=lambdawg-permission&param_ExternalId=Lambdawg&templateURL=https://lambdawg.s3.amazonaws.com/cloudFormation.yaml" target='blank'>
          Connect your AWS account</a><br /><br /></span>
        Step 2: Paste your ARN key below<br />
      </p>
      <div className='settings-form-container'>
        <form onSubmit={handleSubmit}>
            {/* <input type="password" name="arn" placeholder=' ARN key' value={formData.arn} onChange={handleInputChange} required /> */}
            <input
              type="password"
              name="arn"
              placeholder={user.arn ? user.arn : ' ARN key'}
              value={formData.arn}
              onChange={handleInputChange}
              required
            />

           <p>Step 3. Select your region</p>
           <select
            name="aws_region"
            value={formData.aws_region}
            onChange={handleInputChange}
            required
            defaultValue={user.region}
           >
              <option value="">Select AWS Region</option>
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="us-west-1">US West (N. California)</option>
              <option value="us-west-2">US West (Oregon)</option>
              <option value="eu-west-1">EU (Ireland)</option>
              <option value="eu-central-1">EU (Frankfurt)</option>
              <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
              <option value="ap-southeast-2">Asia Pacific (Sydney)</option>
              <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
              <option value="sa-east-1">South America (São Paulo)</option>
            </select><br/>
            <input type="password" name="password_" placeholder=' Your LAMBDAWG password' value={formData.password_} onChange={handleInputChange} required />
        </form>
      </div>
      <Link to="/docs" ><button className='settings-secondary-button stack-button'>Read the Docs</button></Link>
     <button onClick={handleSubmit} className='settings-primary-button stack-button'>Get my metrics</button>

    </div>


  )

}
  export default Settings;





