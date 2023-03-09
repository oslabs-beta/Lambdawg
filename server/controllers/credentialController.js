const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
// const creds = require('../aws/secret');
const dotenv = require('dotenv').config();
const { _KEY, _SKEY, USER_ARN } = process.env;
// const dotenv = require('dotenv');
// dotenv.config();

const credentialController = {};
//declare a constant variable called credentials, which will be used to call the AWS STS API, passing in the access key id and secret access key of the cloudband account
const credentials = {
  accessKeyId: _KEY,
  secretAccessKey: _SKEY,
};

//get user's access key id and secret access key from AWS
credentialController.getCredentials = async (req, res, next) => {
  // console.log('credential controller arn', req.body.arn);
  // const { arn } = req.body;
  const arn = USER_ARN;
  const region = 'us-east-1';
  const info = {
    RoleArn: arn,
    RoleSessionName: "LambdawgRoleSession",
    DurationSeconds: 900,
    ExternalId: "Lambdawg",
  };
  //create new STS client instance with cloudband's region and credentials
  const stsClient = new STSClient({ region: region, credentials: credentials });

  //send request to AWS to assume role in user's account to retrieve temporary credentials for read-only access
  try {
    const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
    const sessionToken = assumedRole.Credentials.SessionToken;
    res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = credentialController;
