
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"; 

const Settings = (props) => {
  const [formData, setFormData] = useState({ user_name: '', arn: '', region: '', password_: '' });
  const { userName } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const arnFormData = {
      // full_name: , 
      // user_name: userName,
      // email: , 
      // password_: formData.password_,
      // id: ,
      // arn: formData.arn,
      // region: formData.aws_region,
    };
    console.log(arnFormData)

    try{
      const response = await fetch('/wherever', {
        method: 'PATCH',
        headers: {'content type': 'application/json'},
        body: JSON.stringify(arnFormData)
      })
      if (response.ok){
        const navigate = useNavigate();
        navigate('/dashboard');
      }
      else {
        console.log('Unable to patch arn etc from settings')
      }

    }
    catch(error){

    }
  }


  return(
    <div className='horizontal-line'>
      <p>
        Step 1: <span className='visible-link'><a href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=lambdawg-permission&param_ExternalId=Lambdawg&templateURL=https://lambdawg.s3.amazonaws.com/cloudFormation.yaml" target='blank'>
          Connect your AWS account</a><br /><br /></span>
        Step 2: Paste your ARN key below<br />
      </p>
      <div className='settings-form-container'>
        <form onSubmit={handleSubmit}>
            <input type="password" name="arn" placeholder=' ARN key' value={formData.arn} onChange={handleInputChange} required />
           <p>Step 3. Select your region</p>
           <select name="aws_region" value={formData.aws_region} onChange={handleInputChange} required>
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








//// chat gpt stuff:
// To fetch user data from the AWS CloudWatch API, you will need to authenticate your requests using AWS 
// access keys. You can ensure the safety of your user's secrets by using the AWS Security Token Service 
// (STS) to generate temporary security credentials that grant limited permissions to access AWS services.

// Here's an example of how you can use the AWS SDK for JavaScript to fetch data from the AWS CloudWatch 
// API using temporary security credentials:


    // const [accessKeyId, setAccessKeyId] = useState('');
    // const [secretAccessKey, setSecretAccessKey] = useState('');
    // const [sessionToken, setSessionToken] = useState('');
  
    // const handleAccessKeyIdChange = (event) => {
    //   setAccessKeyId(event.target.value);
    // };
  
    // const handleSecretAccessKeyChange = (event) => {
    //   setSecretAccessKey(event.target.value);
    // };
  
    // const handleSessionTokenChange = (event) => {
    //   setSessionToken(event.target.value);
    // };
  
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   const sts = new AWS.STS({
    //     accessKeyId,
    //     secretAccessKey,
    //     sessionToken
    //   });
    //   const { Credentials } = await sts.getFederationToken({
    //     Name: 'cloudwatch-user',
    //     Policy: JSON.stringify({
    //       Version: '2012-10-17',
    //       Statement: [
    //         {
    //           Effect: 'Allow',
    //           Action: 'cloudwatch:GetMetricData',
    //           Resource: '*'
    //         }
    //       ]
    //     })
    //   }).promise();
    //   const cloudwatch = new AWS.CloudWatch({
    //     accessKeyId: Credentials.AccessKeyId,
    //     secretAccessKey: Credentials.SecretAccessKey,
    //     sessionToken: Credentials.SessionToken
    //   });
    //   const response = await cloudwatch.getMetricData({
    //     MetricDataQueries: [
    //       {
    //         Id: 'm1',
    //         MetricStat: {
    //           Metric: {
    //             Namespace: 'AWS/EC2',
    //             MetricName: 'CPUUtilization',
    //             Dimensions: [
    //               {
    //                 Name: 'InstanceId',
    //                 Value: 'i-0123456789abcdef0'
    //               }
    //             ]
    //           },
    //           Period: 60,
    //           Stat: 'Average'
    //         },
    //         ReturnData: true
    //       }
    //     ],
    //     StartTime: new Date(new Date().getTime() - 3600000),
    //     EndTime: new Date()
    //   }).promise();
    //   console.log('CloudWatch data:', response.MetricDataResults);
    // };
  
    // return (
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Access Key ID:
    //       <input type="text" value={accessKeyId} onChange={handleAccessKeyIdChange} />
    //     </label>
    //     <br />
    //     <label>
    //       Secret Access Key:
    //       <input type="text" value={secretAccessKey} onChange={handleSecretAccessKeyChange} />
    //     </label>
    //     <br />
    //     <label>
    //       Session Token:
    //       <input type="text" value={sessionToken} onChange={handleSessionTokenChange} />
    //     </label>
    //     <br />
    //     <button type="submit">Fetch CloudWatch Data</button>
    //   </form>
    // );
  // }
  



