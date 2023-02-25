
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";// import AWS from 'aws-sdk';

const Settings = (props) => {
// apon arrival, check session cookie - if none, redirect to sign up
// send cookie to db to verify which profile to display
// display current username and email in the fields



  return(

    <div className='form-container'>
      <form>
      <p>This can't really be anything yet because we will have actual bcrypt thus no password updating,
        this should really be where we have them input secret keys (that do NOT get saved somehow...)
      </p>
      
      </form>
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
  



